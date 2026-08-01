export type WebsiteType =
  | "portfolio"
  | "graduation"
  | "business"
  | "ecommerce"
  | "landing"
  | "hospital"
  | "school"
  | "restaurant"
  | "company"
  | "personal";

export type GeneratedFile = { path: string; content: string; language: string };

export type GenerationResult = {
  projectId: string;
  name: string;
  summary: string;
  pages: string[];
  features: string[];
  palette: string[];
  files: GeneratedFile[];
  previewHtml: string;
  liveUrl?: string;
  repositoryUrl?: string;
};

export type GeneratorRequest = {
  prompt: string;
  websiteType: WebsiteType;
  colorTheme: string;
  typography: string;
  framework: "nextjs" | "react" | "html" | "vue" | "angular";
  language: "english" | "arabic" | "both";
};

export type ProjectSummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "draft" | "generating" | "ready" | "deployed" | "failed";
  framework: string;
  thumbnail: string;
  updatedAt: string;
  liveUrl?: string;
  favorite?: boolean;
};
