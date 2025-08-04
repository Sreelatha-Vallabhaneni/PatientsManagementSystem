import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow requests from frontend
  app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://patientsmanagementsystem.vercel.app',
    'https://patients-management-system-x892.vercel.app',
    // 'https://ebbec5f2507b.ngrok-free.app',
  ],
  credentials: true,
});

  await app.listen(5001);
}
bootstrap();
