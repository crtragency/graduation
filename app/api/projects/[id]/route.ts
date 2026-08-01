import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth";
import { findOwnedProject } from "@/lib/repositories/projects";
import { hasDatabase, prisma } from "@/lib/db";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";
import { projectUpdateSchema } from "@/lib/validation";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  try { rateLimit(request,"project-read",60); const user=await requireApiUser(); const {id}=await params; const project=await findOwnedProject(user.id,id); return project?NextResponse.json({data:project}):NextResponse.json({error:"Project not found"},{status:404}); }
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}

export async function PATCH(request: NextRequest, { params }: Context) {
  try { assertSameOrigin(request); rateLimit(request,"project-write",20); const user=await requireApiUser(); const {id}=await params; const existing=await findOwnedProject(user.id,id); if(!existing)return NextResponse.json({error:"Project not found"},{status:404}); const input=projectUpdateSchema.parse(await request.json()); if(!hasDatabase())return NextResponse.json({data:{...existing,...input}}); return NextResponse.json({data:await prisma.project.update({where:{id},data:input})}); }
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:error&&typeof error==='object'&&'issues'in error?400:issue.status});}
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try { assertSameOrigin(request); rateLimit(request,"project-delete",10); const user=await requireApiUser(); const {id}=await params; const existing=await findOwnedProject(user.id,id); if(!existing)return NextResponse.json({error:"Project not found"},{status:404}); if(hasDatabase())await prisma.project.update({where:{id},data:{status:"ARCHIVED"}}); return new NextResponse(null,{status:204}); }
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}
