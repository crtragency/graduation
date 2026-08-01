import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";

const schema=z.object({domain:z.string().trim().toLowerCase().regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/),projectId:z.string().min(1).max(120)});

export async function POST(request:NextRequest){
  try{assertSameOrigin(request);rateLimit(request,"domain",8);await requireApiUser();const input=schema.parse(await request.json());if(!process.env.VERCEL_TOKEN)return NextResponse.json({error:"Connect Vercel before adding a domain."},{status:503});const query=process.env.VERCEL_TEAM_ID?`?teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}`:"";const response=await fetch(`https://api.vercel.com/v10/projects/${encodeURIComponent(input.projectId)}/domains${query}`,{method:"POST",headers:{authorization:`Bearer ${process.env.VERCEL_TOKEN}`,"content-type":"application/json"},body:JSON.stringify({name:input.domain})});const data=await response.json();return response.ok?NextResponse.json({data}):NextResponse.json({error:data.error?.message??"Domain could not be added."},{status:response.status});}
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}
