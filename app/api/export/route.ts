import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { z } from "zod";
import { requireApiUser } from "@/lib/auth";
import { assertSameOrigin, rateLimit } from "@/lib/security";
import { slugify } from "@/lib/utils";

const schema=z.object({name:z.string().min(1).max(80),files:z.array(z.object({path:z.string().min(1).max(240).refine((path)=>!path.includes("..")&&!path.startsWith("/")),content:z.string().max(2_000_000),language:z.string().max(20)})).max(300)});

export async function POST(request: NextRequest) {
  try { assertSameOrigin(request);rateLimit(request,"export",12);await requireApiUser();const input=schema.parse(await request.json());const zip=new JSZip();for(const file of input.files)zip.file(file.path,file.content);zip.file("PROJECTFORGE.md",`# ${input.name}\n\nGenerated with ProjectForge AI.\n`);const archive=await zip.generateAsync({type:"uint8array",compression:"DEFLATE",compressionOptions:{level:6}});return new NextResponse(Buffer.from(archive),{headers:{"content-type":"application/zip","content-disposition":`attachment; filename="${slugify(input.name)}.zip"`,"cache-control":"no-store"}}); }
  catch{return NextResponse.json({error:"The export could not be created."},{status:400});}
}
