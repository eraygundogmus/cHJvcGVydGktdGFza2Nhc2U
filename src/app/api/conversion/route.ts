import { NextRequest, NextResponse } from "next/server";
import { RomanConverter } from "@/lib/converter";
import { RateLimiterMemory } from "rate-limiter-flexible";

export interface ConversionResponse {
  result: string;
}

const rateLimiter = new RateLimiterMemory({
  points: 15,
  duration: 60,
});

export async function POST(
  req: NextRequest
): Promise<NextResponse<ConversionResponse | any>> {
  try {
    await rateLimiter.consume(req.ip as string);

    const body = await req.json();
    const number = body.number;

    return NextResponse.json({
      result: RomanConverter.toRoman(number),
    });
  } catch (rateLimiterError) {
    // Handling rate limiter error
    return new NextResponse(
      JSON.stringify({
        error: "Too many requests, please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
