import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db/db";
import { ItemTypeCreation } from "@/entities/Item";

export async function POST(req: NextRequest) {
  const newItem = (await req.json()) as ItemTypeCreation;
  const isCategoryExist = await db.category.findUnique({
    where: { id: newItem.category.id },
  });
  if (isCategoryExist) {
    const createItem = await db.item.create({
      data: {
        name: newItem.name,
        categoryId: newItem.category.id,
        image: newItem.image,
        note: newItem.note,
      },
    });
    console.log("created", createItem);
    return NextResponse.json(createItem);
  } else {
    console.log("createdCategory");

    const newCategory = await db.category.create({
      data: {
        name: newItem.category.name,
        id: newItem.category.id,
        items: {
          create: {
            name: newItem.name,
            image: newItem.image,
            note: newItem.note,
          },
        },
      },
    });
    return NextResponse.json(newCategory);
  }
}
