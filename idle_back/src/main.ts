import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // Remplacez ceci par l'URL de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('IDLE_BACK')
    .setDescription(
      'You can found here the documentation about our API IDLE_BACK',
    )
    .setVersion('1.0')
    .addTag('idle_back')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
