import "../envConfig"
import { prisma } from "../lib/prisma"

async function main() {
  await prisma.tenant.findFirst({
    select: { id: true },
  })

  console.log("✅ Connected")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
