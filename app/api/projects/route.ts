import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/lib/repositories/projects";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";
import { projectCreateSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  try { rateLimit(request, "projects-read", 60); const user = await requireApiUser(); return NextResponse.json({ data: await listProjects(user) }); }
  catch (error) { const issue=apiError(error); return NextResponse.json({error:issue.message},{status:issue.status}); }
}

export async function POST(request: NextRequest) {
  try { assertSameOrigin(request); rateLimit(request, "projects-write", 20); const user=await requireApiUser(); const input=projectCreateSchema.parse(await request.json()); return NextResponse.json({data:await createProject(user,input)},{status:201}); }
  catch (error) { const issue=apiError(error); return NextResponse.json({error:issue.message},{status:error&&typeof error==='object'&&'issues'in error?400:issue.status}); }
}
