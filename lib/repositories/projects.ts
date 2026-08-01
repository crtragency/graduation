import { prisma, hasDatabase } from "@/lib/db";
import { projects as mockProjects } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

async function resolveOwner(clerkId: string, email: string, name: string) {
  return prisma.user.upsert({ where: { clerkId }, update: { email, name }, create: { clerkId, email: email || `${clerkId}@demo.projectforge.ai`, name } });
}

export async function listProjects(user: { id: string; email: string; name: string }) {
  if (!hasDatabase()) return mockProjects;
  const owner = await resolveOwner(user.id, user.email, user.name);
  return prisma.project.findMany({ where: { ownerId: owner.id, status: { not: "ARCHIVED" } }, orderBy: { updatedAt: "desc" }, take: 100 });
}

export async function createProject(user: { id: string; email: string; name: string }, input: { name: string; description: string; prompt: string; framework: string }) {
  if (!hasDatabase()) return { id: `proj_${crypto.randomUUID()}`, slug: slugify(input.name), status: "DRAFT", ...input, createdAt: new Date(), updatedAt: new Date() };
  const owner = await resolveOwner(user.id, user.email, user.name);
  let slug = slugify(input.name);
  const exists = await prisma.project.findFirst({ where: { ownerId: owner.id, slug } });
  if (exists) slug = `${slug}-${Date.now().toString().slice(-5)}`;
  return prisma.project.create({ data: { ...input, slug, ownerId: owner.id } });
}

export async function findOwnedProject(userId: string, id: string) {
  if (!hasDatabase()) return mockProjects.find((project) => project.id === id) ?? null;
  return prisma.project.findFirst({ where: { id, owner: { clerkId: userId } }, include: { versions: { orderBy: { number: "desc" }, take: 1 }, deployments: { orderBy: { createdAt: "desc" }, take: 5 } } });
}
