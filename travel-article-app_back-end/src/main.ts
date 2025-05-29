import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalTransformInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const globalTransformInterceptor = app.get(GlobalTransformInterceptor);

  app.useGlobalInterceptors(globalTransformInterceptor);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Travel Article API')
    .setDescription('API for articles, users, comments')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`🚀 Server running at: ${url} in ${process.env.NODE_ENV} mode`);
}

bootstrap();
