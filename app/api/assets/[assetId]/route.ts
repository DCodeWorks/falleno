import { getAssetById } from "@/app/lib/data";
import { NextResponse } from "next/server";

// Questa funzione GET viene eseguita solo sul server
export async function GET(
  request: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const assetId = params.assetId;
    const asset = await getAssetById(assetId);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
