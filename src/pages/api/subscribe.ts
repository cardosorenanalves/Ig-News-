import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse)=> {
    if(req.method === 'POST'){
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {price: "price_1LdFihHx3kQatLxVlGUyPfDS", quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
    }else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}