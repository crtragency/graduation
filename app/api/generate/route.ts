import { NextRequest, NextResponse } from "next/server";
import { generateProject } from "@/lib/ai/generator";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";
import { generatorSchema, sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    rateLimit(request, "generate", 8, 60_000);
    await requireApiUser();
    const parsed = generatorSchema.parse(await request.json());
    const result = await generateProject({ ...parsed, prompt: sanitizeText(parsed.prompt) });
    return NextResponse.json({ data: result });
  } catch (error) {
    const issue = apiError(error);
    if (error && typeof error === "object" && "issues" in error) return NextResponse.json({ error: "Please check the project details and try again.", issues: error.issues }, { status: 400 });
    return NextResponse.json({ error: issue.message }, { status: issue.status });
  }
}
