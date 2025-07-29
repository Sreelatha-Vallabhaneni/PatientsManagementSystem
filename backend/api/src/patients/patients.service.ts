// patients.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto) {
  const { dob, ...rest } = createPatientDto;
  return this.prisma.patient.create({
    data: {
      ...rest,
      dob: new Date(dob), // <-- converts "1992-04-10" to full Date object
    },
  });
}

//   create(data: CreatePatientDto) {
//     return this.prisma.patient.create({ data });
//   }

  findAll() {
    return this.prisma.patient.findMany();
  }

  update(id: number, data: UpdatePatientDto) {
    return this.prisma.patient.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
