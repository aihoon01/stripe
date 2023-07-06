import { IsNotEmpty, IsNumber } from "class-validator"


export class PaymentDto {
    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    medium: Medium

    @IsNotEmpty()
    quantity: number

    @IsNotEmpty()
    apikey: string
}

export enum Medium {
    CARD = "card",
    CASHAPP = "cashapp",
    ALIPAY = "alipay"

}