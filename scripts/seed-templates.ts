import { prisma } from "../lib/prisma"
import { prebuiltTemplates } from "../lib/template-seeds"
import { v4 as uuidv4 } from "uuid"

async function seedTemplates() {
  console.log("Seeding prebuilt templates...")

  try {
    // Find or create system user
    let systemUser = await prisma.user.findUnique({
      where: { email: "system@creativeai.com" },
    })

    if (!systemUser) {
      systemUser = await prisma.user.create({
        data: {
          id: uuidv4(),
          email: "system@creativeai.com",
          role: "DESIGNER",
        },
      })
      console.log(`Created system user with ID: ${systemUser.id}`)
    } else {
      console.log(`Found existing system user with ID: ${systemUser.id}`)
    }

    // Delete existing system templates to avoid duplicates
    const deleted = await prisma.template.deleteMany({
      where: { userId: systemUser.id },
    })
    console.log(`🗑️ Deleted ${deleted.count} existing templates.`)

    // Create prebuilt templates
    for (const template of prebuiltTemplates) {
      await prisma.template.create({
        data: {
          name: template.name,
          description: template.description,
          category: template.category as any,
          content: template.content,
          thumbnail: template.thumbnail,
          tags: template.tags,
          isPublic: true,
          userId: systemUser.id,
        },
      })
      console.log(`Created template: ${template.name}`)
    }

    console.log("Successfully seeded all prebuilt templates!")
  } catch (error) {
    console.error("Error seeding templates:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTemplates()
