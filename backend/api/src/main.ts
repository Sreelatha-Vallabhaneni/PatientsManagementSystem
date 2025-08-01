import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow requests from frontend
  app.enableCors({
    origin: 'http://localhost:3000', // adjust this if frontend is hosted elsewhere
    credentials: true,
  });

  await app.listen(5001);
}
bootstrap();
