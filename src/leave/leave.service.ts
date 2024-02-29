import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeaveDto } from 'src/leave/dto/create-leave.dto';
import { ILeave } from 'src/leave/leave.interface';
import { UpdateLeaveDto } from 'src/leave/dto/update-leave.dto';

@Injectable()
export class LeaveService {
  constructor(@InjectModel('Leave') private leaveModel: Model<ILeave>) { }

  async create(createLeaveDto: CreateLeaveDto): Promise<ILeave> {
    const createdLeave = await new this.leaveModel(createLeaveDto);
    return createdLeave.save();
  }

  async findAll(): Promise<ILeave[]> {
    const leaveData = await this.leaveModel.find();
    if (!leaveData || leaveData.length === 0) {
        throw new NotFoundException('No leave data found');
    }
    return leaveData;
  }
  
  async updateLeave(leaveId: string, updateLeaveDto: UpdateLeaveDto): Promise<ILeave> {
    const existingLeave = await this.leaveModel.findByIdAndUpdate(leaveId, updateLeaveDto, {
      new: true,
    });
    if(!existingLeave) {
      throw new NotFoundException('Leave not found');
    }
    return existingLeave;
  }

  async getLeave(leaveId: string): Promise<ILeave> {
    const existingLeave = await this.leaveModel.findById(leaveId).exec();
    if(!existingLeave) {
        throw new NotFoundException('Leave not found');
    }
    return existingLeave;
}


//   async findOne(id: string): Promise<ILeave> {
//     return this.leaveModel.findById(id).exec();
//   }

  async deleteLeave(leaveId: string): Promise<ILeave> {
    const deletedLeave = await this.leaveModel.findByIdAndDelete(leaveId);
    if (!deletedLeave) {
      throw new NotFoundException('Leave not found');
    }
    return deletedLeave;
  }
}
