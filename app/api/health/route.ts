import { NextResponse } from "next/server";
import { hasDatabase, prisma } from "@/lib/db";

export async function GET(){
  let database="not-configured";if(hasDatabase()){try{await prisma.$queryRaw`SELECT 1`;database="healthy";}catch{database="unavailable";}}
  return NextResponse.json({status:database==="unavailable"?"degraded":"healthy",database,services:{openai:Boolean(process.env.OPENAI_API_KEY),clerk:Boolean(process.env.CLERK_SECRET_KEY),stripe:Boolean(process.env.STRIPE_SECRET_KEY),vercel:Boolean(process.env.VERCEL_TOKEN),storage:Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)},timestamp:new Date().toISOString()},{status:database==="unavailable"?503:200,headers:{"cache-control":"no-store"}});
}
