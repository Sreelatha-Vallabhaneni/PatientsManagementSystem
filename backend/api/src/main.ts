import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow requests from frontend
  app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://patients-management-system-x892.vercel.app',
  ],
  credentials: true,
});

  await app.listen(5001);
}
bootstrap();
