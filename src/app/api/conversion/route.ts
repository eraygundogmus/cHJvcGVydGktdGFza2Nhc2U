import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { RomanConverter } from "@/lib/converter";

export interface ConversionResponse {
  convertedNumber: number;
}

export async function POST(
  req: NextApiRequest
): Promise<NextResponse<ConversionResponse | any>> {
  const body = await req.json();
  const number = body.number;

  return NextResponse.json({
    result: RomanConverter.toRoman(number),
  });
}
