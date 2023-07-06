import { Controller, Get, Res } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { userDto } from 'src/auth/dto';
import { AccessService } from './access.service';
import { MailingService } from 'src/config/mail/mail.service';

@ApiTags('Route-Access')
@Controller('access')
export class AccessController {
    constructor(private mailingSerivice: MailingService) {}
    @ApiAcceptedResponse({type: userDto})
    @UseGuards(JwtGuard)
    @Get()
    getIn(@GetUser() user: User,  @Res({passthrough: true}) res: Response):{} {
        return [user, this.mailingSerivice.openConnection({
            to: user.email,
            from: 'services@stripper.com',
            subject: 'Your Stripper Key',
            text: ``,
            html: `<h4> Protect your api key</h4><br></br>
            Hello, ${user.email.split('@')[0]} Your api key is ${user.apiKey}`
        })]
    }
}

