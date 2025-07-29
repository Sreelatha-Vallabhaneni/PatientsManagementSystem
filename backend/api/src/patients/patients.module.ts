import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

@Module({controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
  exports: [PatientsService],
})
export class PatientsModule {}
