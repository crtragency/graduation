import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap():MetadataRoute.Sitemap{return [{url:absoluteUrl("/"),lastModified:new Date(),changeFrequency:"weekly",priority:1},{url:absoluteUrl("/#features"),lastModified:new Date(),changeFrequency:"monthly",priority:.8},{url:absoluteUrl("/#pricing"),lastModified:new Date(),changeFrequency:"monthly",priority:.8}]}
