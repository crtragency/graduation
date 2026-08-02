import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";
import { slugify } from "@/lib/utils";

const schema = z.object({ name: z.string().min(1).max(80), files: z.array(z.object({ path: z.string().min(1).max(240), content: z.string().max(1_000_000), language: z.string() })).min(1).max(100) });

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    rateLimit(request, "github", 4, 60_000);
    await requireApiUser();
    const input = schema.parse(await request.json());
    const token = process.env.GITHUB_TOKEN;
    if (!token) return NextResponse.json({ error: "Connect GitHub in Settings → Integrations first." }, { status: 503 });
    const headers = { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28", "content-type": "application/json" };
    const repoResponse = await fetch("https://api.github.com/user/repos", { method: "POST", headers, body: JSON.stringify({ name: slugify(input.name), description: "Graduation project website prepared with ProjectForge EDU", private: false, auto_init: true }) });
    const repo = await repoResponse.json();
    if (!repoResponse.ok) return NextResponse.json({ error: repo.message ?? "GitHub repository could not be created." }, { status: repoResponse.status });
    await new Promise((resolve) => setTimeout(resolve, 700));
    for (const file of input.files) {
      const url = `https://api.github.com/repos/${repo.full_name}/contents/${file.path.split("/").map(encodeURIComponent).join("/")}`;
      const response = await fetch(url, { method: "PUT", headers, body: JSON.stringify({ message: `Add ${file.path}`, content: Buffer.from(file.content).toString("base64") }) });
      if (!response.ok) throw new Error(`Could not upload ${file.path}`);
    }
    return NextResponse.json({ url: repo.html_url, fullName: repo.full_name });
  } catch (error) {
    const issue = apiError(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : issue.message }, { status: issue.status });
  }
}
