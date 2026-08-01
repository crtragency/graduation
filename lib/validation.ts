import { z } from "zod";

export const generatorSchema = z.object({
  prompt: z.string().trim().min(20, "Describe the project in a little more detail").max(5000),
  websiteType: z.enum(["portfolio", "graduation", "business", "ecommerce", "landing", "hospital", "school", "restaurant", "company", "personal"]),
  colorTheme: z.string().trim().min(2).max(80),
  typography: z.string().trim().min(2).max(80),
  framework: z.enum(["nextjs", "react", "html", "vue", "angular"]),
  language: z.enum(["english", "arabic", "both"]),
});

export const projectCreateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().max(500).default(""),
  prompt: z.string().trim().min(10).max(5000),
  framework: z.string().trim().max(30).default("nextjs"),
});

export const projectUpdateSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  description: z.string().trim().max(500).optional(),
  favorite: z.boolean().optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC", "UNLISTED"]).optional(),
});

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, " ").trim();
}
