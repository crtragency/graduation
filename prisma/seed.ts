import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const templates = [
    { name: "HealthOS", slug: "healthos", category: "Graduation", description: "Hospital operations dashboard", prompt: "Create a modern hospital management platform with patients, appointments, doctors, analytics, and role-based access.", featured: true },
    { name: "Nova Portfolio", slug: "nova-portfolio", category: "Portfolio", description: "Editorial product designer portfolio", prompt: "Create a premium portfolio with case studies, about, services, testimonials, and contact.", featured: true },
    { name: "LaunchKit", slug: "launchkit", category: "Landing", description: "High-converting startup launch page", prompt: "Create a SaaS landing page with hero, product demo, features, social proof, pricing, FAQ, and CTA.", featured: true },
  ];
  for (const template of templates) await prisma.template.upsert({ where: { slug: template.slug }, update: template, create: { ...template, published: true } });
}

main().finally(() => prisma.$disconnect());
