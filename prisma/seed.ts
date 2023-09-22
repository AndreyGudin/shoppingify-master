import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Fruit and vegetables",
      },
      {
        name: "Meat and fish",
      },
      {
        name: "Beverages",
      },
    ],
  });
  const items = await prisma.item.createMany({
    data: [
      {
        name: "Avocado",
        categoryId: 1,
      },
      {
        name: "Banana",
        categoryId: 1,
      },
      {
        name: "Watermelon",
        categoryId: 1,
      },
      {
        name: "Chicken 1kg",
        categoryId: 2,
      },
      {
        name: "Salmon 1kg",
        categoryId: 2,
      },
      {
        name: "Chicken leg box",
        categoryId: 2,
      },
      {
        name: "Chicken 1kg",
        categoryId: 3,
      },
      {
        name: "Salmon 1kg",
        categoryId: 3,
      },
      {
        name: "Chicken leg box",
        categoryId: 3,
      },
    ],
  });
  console.log({ user, categories, items });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
