import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);



  app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://patientsmanagementsystem.vercel.app',
      'https://patients-management-system-x892.vercel.app',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  //credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'], // ✅ ADD THIS
});

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
