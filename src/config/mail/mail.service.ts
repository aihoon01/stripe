import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer"
import { MailingDto } from "../dto";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

interface MailConfig  {
  transport: {
    host: string,
    // port: number,
    // ignoreTLS: boolean,
    // secure: boolean,
    auth: {
      user: string,
      pass: string
    },
  },
  defaults: {
    from: string,
  },
  preview: boolean
 
};

const mail_user = configService.get("MAIL_USER");
const mail_pass = configService.get("MAIL_PASS");

export const mailConfig : MailConfig = {
    transport: {
          host: "smtp.gmail.com",
          auth: {
            user: mail_user,
            pass: mail_pass
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        preview: true
};



@Injectable()
export class MailingService {
    constructor(private readonly mailerService: MailerService) {}
    
    public async openConnection(mailingDto: MailingDto) {
        return await this.mailerService
            .sendMail({
                to: mailingDto.to,
                from: mailingDto.from,
                subject: mailingDto.subject,
                text: mailingDto.text,
                html: mailingDto.html
            })
            .then(() => {})
            .catch(()=> {
              throw new InternalServerErrorException("Something went wrong")
            });
  }

} 