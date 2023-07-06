import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(cookieParser())

const config = new DocumentBuilder()
.setTitle('Stripe API')
.setDescription('Payment API for ecommerce sites')
.setVersion('1.0')
.addTag('Stripper')
.build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  await app.listen(3000);
  console.log(`App is listening on Port: 3000`)
}
bootstrap(); 
