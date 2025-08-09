import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);


  interface CorsOptions {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    credentials?: boolean;
  }

  const allowedOrigins: string[] = [
    'http://localhost:3000',
    'https://patientsmanagementsystem.vercel.app',
    'https://patients-management-system-x892.vercel.app',
  ];

  const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.enableCors(corsOptions);
   await app.listen(process.env.PORT ||  5001);
}
bootstrap();







// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';


// async function bootstrap() {
//   dotenv.config();
//   const app = await NestFactory.create(AppModule);

//   // ✅ Enable CORS to allow requests from frontend
//   app.enableCors({
//   origin: (origin, callback) => {
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'https://patientsmanagementsystem.vercel.app',
//       'https://patients-management-system-x892.vercel.app',
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// });


//   await app.listen(5001);
// }
// bootstrap();
