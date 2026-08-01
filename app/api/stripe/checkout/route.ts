import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { requireApiUser } from "@/lib/auth";
import { absoluteUrl } from "@/lib/utils";
import { apiError, assertSameOrigin, rateLimit } from "@/lib/security";

const schema=z.object({plan:z.enum(["pro","team"])});

export async function POST(request: NextRequest) {
  try { assertSameOrigin(request);rateLimit(request,"checkout",6,60_000);const user=await requireApiUser();const {plan}=schema.parse(await request.json());if(!process.env.STRIPE_SECRET_KEY)return NextResponse.json({error:"Stripe is not configured yet."},{status:503});const priceId=plan==="pro"?process.env.STRIPE_PRO_PRICE_ID:process.env.STRIPE_TEAM_PRICE_ID;if(!priceId)return NextResponse.json({error:`The ${plan} price is not configured.`},{status:503});const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);const session=await stripe.checkout.sessions.create({mode:"subscription",line_items:[{price:priceId,quantity:1}],customer_email:user.email||undefined,client_reference_id:user.id,success_url:absoluteUrl("/dashboard/billing?checkout=success"),cancel_url:absoluteUrl("/dashboard/billing?checkout=canceled"),allow_promotion_codes:true,subscription_data:{metadata:{userId:user.id,plan}}});return NextResponse.json({url:session.url}); }
  catch(error){const issue=apiError(error);return NextResponse.json({error:issue.message},{status:issue.status});}
}
