import { NextResponse, NextRequest } from "next/server";

export async function POST() {
  return NextResponse.redirect("/api/content-image-upload");
}
