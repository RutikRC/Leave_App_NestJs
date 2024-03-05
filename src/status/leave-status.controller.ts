// status.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { StatusService } from './leave-status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { IStatus } from './leave-status.interface';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto): Promise<IStatus> {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  async findAll(): Promise<IStatus[]> {
    return this.statusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IStatus> {
    const status = await this.statusService.findOne(id);
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<IStatus> {
    return this.statusService.update(id, updateStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IStatus> {
    return this.statusService.remove(id);
  }
}
