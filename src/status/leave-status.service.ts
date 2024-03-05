// status.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { IStatus } from './leave-status.interface';

@Injectable()
export class StatusService {
  constructor(@InjectModel('Status') private statusModel: Model<IStatus>) {}

  async create(createStatusDto: CreateStatusDto): Promise<IStatus> {
    const createdStatus = new this.statusModel(createStatusDto);
    return await createdStatus.save();
  }

  async findAll(): Promise<IStatus[]> {
    return await this.statusModel.find().populate('leaveId').populate('userId', 'username role').exec();
  }

  async findOne(id: string): Promise<IStatus> {
    const status = await this.statusModel.findById(id).populate('leaveId').populate('userId', 'username role').exec();
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<IStatus> {
    return await this.statusModel.findByIdAndUpdate(id, updateStatusDto, { new: true });
  }

  async remove(id: string): Promise<IStatus> {
    return await this.statusModel.findByIdAndDelete(id);
  }
}
