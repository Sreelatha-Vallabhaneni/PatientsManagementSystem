





import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  create(createPatientDto: CreatePatientDto) {
    const { dob, firstName, lastName, email, phoneNumber } = createPatientDto;

    return this.prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        dob: new Date(dob),
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany();
  }

  update(id: string, data: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  remove(id) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
