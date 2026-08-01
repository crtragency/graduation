import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireApiUser } from "@/lib/auth";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";

const allowed=new Set(["image/png","image/jpeg","image/webp","image/gif","application/pdf","text/plain"]);

export async function POST(request: NextRequest) {
  try{assertSameOrigin(request);rateLimit(request,"upload",20);const user=await requireApiUser();if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)return NextResponse.json({error:"Storage is not configured."},{status:503});const form=await request.formData();const file=form.get("file");if(!(file instanceof File))return NextResponse.json({error:"Choose a file to upload."},{status:400});if(file.size>10*1024*1024)return NextResponse.json({error:"Files must be smaller than 10 MB."},{status:413});if(!allowed.has(file.type))return NextResponse.json({error:"This file type is not supported."},{status:415});const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"-");const path=`${user.id}/${crypto.randomUUID()}-${safe}`;const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}});const bucket=process.env.SUPABASE_STORAGE_BUCKET??"projectforge-assets";const {error}=await supabase.storage.from(bucket).upload(path,file,{contentType:file.type,upsert:false});if(error)throw error;const {data}=supabase.storage.from(bucket).getPublicUrl(path);return NextResponse.json({path,url:data.publicUrl});}
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}
