import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db/db";
import { Prisma } from "@prisma/client";
import { ItemInList } from "@/entities/ShoppingListComponent";
import { Session } from "next-auth";

interface InputShoppingListCreate {
  name: string;
  user: Session["user"];
  items: [string, ItemInList[]][];
}

export async function POST(req: NextRequest) {
  try {
    const { name, user, items } = (await req.json()) as InputShoppingListCreate;
    console.log("back1");

    let allItems: ItemInList[] = [];
    items.forEach((e) => {
      allItems = [...allItems, ...e[1]];
    });
    const itemsForCreation = allItems.map((e) => {
      return {
        assignedAt: new Date(),
        count: e.count,
        item: { connect: { id: e.id } },
      };
    });
    const existedUser = await db.user.findFirst({ where: { id: user.id } });
    console.log("existedUser", existedUser);
    if (user.email) {
      const shoppingList = await db.shoppingList.create({
        data: {
          name,
          user: {
            connect: {
              email: user.email,
            },
          },
          items: { create: itemsForCreation },
        },
      });
      return NextResponse.json(
        JSON.stringify({
          status: "Success",
          message: "Created",
        }),
        { status: 200 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "User not found",
      }),
      { status: 402 }
    );
    console.log("back3");
  } catch (error: any) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const deletedItem = await db.shoppingList.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ deletedItem });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
