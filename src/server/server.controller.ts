import { Controller, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Body, Get, Post, Query } from '@nestjs/common/decorators';
import { PaymentDto } from './dto';
import { ServerService } from './server.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Payment')
@Controller('stripe')
export class ServerController {
    constructor(private server: ServerService) {}

    @ApiCreatedResponse({description: 'Create a new user', type: PaymentDto})
    @Get('payment/:name')
    setup(@Query() queries: PaymentDto,
          @Param('name') name: string) {
        return this.server.stripper(queries, name)

    }

    
    @ApiCreatedResponse({description: 'Redirects a user to success page', type: PaymentDto})
    @HttpCode(HttpStatus.OK)
    @Get('success')
    redirect() {
        return 'Thanks for purchasing from us!..... '
    }


    @HttpCode(HttpStatus.REQUEST_TIMEOUT)
    @Get('failure')
    cancel() {
        return 'Try again'
    }
}