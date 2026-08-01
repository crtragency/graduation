import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth";
import { hasDatabase, prisma } from "@/lib/db";
import { rateLimit } from "@/lib/security";

export async function GET(request:NextRequest){
  try{rateLimit(request,"admin",30);const user=await requireApiUser();if(user.role!=="ADMIN")return NextResponse.json({error:"Forbidden"},{status:403});if(!hasDatabase())return NextResponse.json({data:{users:2847,projects:12042,deployments:8931,revenue:28470,tokens:18_420_000,successRate:98.4}});const [users,projects,deployments,prompts]=await prisma.$transaction([prisma.user.count(),prisma.project.count(),prisma.deployment.count(),prisma.promptLog.aggregate({_sum:{inputTokens:true,outputTokens:true},_avg:{latencyMs:true}})]);return NextResponse.json({data:{users,projects,deployments,tokens:(prompts._sum.inputTokens??0)+(prompts._sum.outputTokens??0),averageLatency:prompts._avg.latencyMs??0}});}catch{return NextResponse.json({error:"Analytics unavailable"},{status:500});}
}
