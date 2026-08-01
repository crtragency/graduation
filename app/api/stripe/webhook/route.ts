import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { hasDatabase, prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  if(!process.env.STRIPE_SECRET_KEY||!process.env.STRIPE_WEBHOOK_SECRET)return NextResponse.json({error:"Stripe webhook is not configured"},{status:503});
  const signature=request.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"Missing signature"},{status:400});
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);let event:Stripe.Event;
  try{event=stripe.webhooks.constructEvent(await request.text(),signature,process.env.STRIPE_WEBHOOK_SECRET);}catch{return NextResponse.json({error:"Invalid signature"},{status:400});}
  if(hasDatabase()&&(event.type==="customer.subscription.created"||event.type==="customer.subscription.updated"||event.type==="customer.subscription.deleted")){
    const subscription=event.data.object as Stripe.Subscription;const userId=subscription.metadata.userId;const item=subscription.items.data[0];
    if(userId&&item)await prisma.subscription.upsert({where:{stripeSubscriptionId:subscription.id},update:{status:subscription.status,stripePriceId:item.price.id,currentPeriodEnd:new Date(item.current_period_end*1000)},create:{stripeSubscriptionId:subscription.id,userId,stripePriceId:item.price.id,status:subscription.status,currentPeriodEnd:new Date(item.current_period_end*1000)}});
  }
  return NextResponse.json({received:true});
}
