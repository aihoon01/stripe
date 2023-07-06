import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ApikeyService } from '../auth/apikey/apikey.service';
import Stripe from 'stripe';
import { PaymentDto } from './dto';
// import { CreateStripeSession } from './create-stripe-session.service';

@Injectable()
export class CreateStripeSession {
  constructor(
    private config: ConfigService
  ) {}

  async createSessions(queries: PaymentDto, name:string
  ) {
  const privateKey = this.config.get('SECRET_KEY');
  const baseUrl = this.config.get('SERVER_URL');
  
   const stripe = new Stripe(privateKey, {apiVersion: '2022-11-15'});
  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [queries.medium],
        line_items:  [{
            price_data: {
                currency: 'usd',
                unit_amount: Number(queries.price) * 100,
                product_data: {
                  name: name
                }
            },
            quantity: Number(queries.quantity),
            
        }],
        mode: 'payment',
        success_url: `${baseUrl}/stripe/success`,
        cancel_url: `${baseUrl}/stripe/failure`
    })
    console.log(session.success_url)

  return({url: session.url})
} catch(error) {
  throw new Error(error.message)
}}
}

@Injectable()
export class ServerService {
    constructor(
      private apiKeyService: ApikeyService,
      private createStripeSession: CreateStripeSession) {}

    async stripper(queries: PaymentDto, name:string) {    
      const verifyApiKey= await this.apiKeyService.verifyApiKey(queries.apikey)
      if (!verifyApiKey) throw new ForbiddenException("Invalid API Key")
      return this.createStripeSession.createSessions(queries, name);
  }
}