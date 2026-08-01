import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";
import { slugify } from "@/lib/utils";

const schema=z.object({name:z.string().min(1).max(80),files:z.array(z.object({path:z.string().min(1).max(240),content:z.string().max(2_000_000),language:z.string()})).min(1).max(300)});

export async function POST(request: NextRequest) {
  try { assertSameOrigin(request);rateLimit(request,"deploy",6,60_000);await requireApiUser();const input=schema.parse(await request.json());if(!process.env.VERCEL_TOKEN)return NextResponse.json({error:"Connect a Vercel token in Settings → Integrations to deploy."},{status:503});const query=process.env.VERCEL_TEAM_ID?`?teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}`:"";const response=await fetch(`https://api.vercel.com/v13/deployments${query}`,{method:"POST",headers:{authorization:`Bearer ${process.env.VERCEL_TOKEN}`,"content-type":"application/json"},body:JSON.stringify({name:slugify(input.name),target:"production",files:input.files.map(file=>({file:file.path,data:file.content})),projectSettings:{framework:"nextjs",buildCommand:"npm run build",installCommand:"npm install"}})});const data=await response.json();if(!response.ok)return NextResponse.json({error:data.error?.message??"Vercel rejected the deployment."},{status:response.status});return NextResponse.json({id:data.id,url:`https://${data.url}`,status:data.readyState??"QUEUED"}); }
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}
