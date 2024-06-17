import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db/db";

export async function GET(req: NextRequest) {
  const categories = await db.category.findMany({});
  console.log("categories", categories);
  if (categories) return NextResponse.json({ categories });

  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: "Not Found",
    }),
    { status: 402 }
  );
}
