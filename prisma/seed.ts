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
        note: `The fruit is exceedingly variable in size, no larger than a hen’s egg in certain Mexican races and sometimes weighing 1–2 kg (2–4 pounds) in other races. The form varies from round to pear-shaped with a long slender neck, and the colour ranges from green to dark purple. Botanically, the fruit is a berry and features a single large round seed with two cotyledons. The fruit’s outer skin is sometimes no thicker than that of an apple and sometimes is coarse and woody in texture.`,
      },
      {
        name: "Banana",
        categoryId: 1,
        note: `The banana plant is a gigantic herb that springs from an underground stem, or rhizome, to form a false trunk 3–6 metres (10–20 feet) high. This trunk is composed of the basal portions of leaf sheaths and is crowned with a rosette of 10 to 20 oblong to elliptic leaves that sometimes attain a length of 3–3.5 metres (10–11.5 feet) and a breadth of 65 cm (26 inches). `,
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
