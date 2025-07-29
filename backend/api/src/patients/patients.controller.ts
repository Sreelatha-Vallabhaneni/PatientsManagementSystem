import { Controller, UseGuards } from '@nestjs/common';

import { Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

import { PatientsService } from './patients.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
    constructor(private readonly service: PatientsService) {}

    @Post()
    @Roles('ADMIN')
    create(@Body() dto: CreatePatientDto) { return this.service.create(dto); }

    @Get()
    @Roles('ADMIN', 'USER')
    findAll() { return this.service.findAll(); }

    @Put(':id')
    @Roles('ADMIN')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
