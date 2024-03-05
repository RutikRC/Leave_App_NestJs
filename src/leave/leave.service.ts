import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateLeaveDto } from 'src/leave/dto/create-leave.dto';
import { ILeave } from 'src/leave/leave.interface';
import { UpdateLeaveDto } from 'src/leave/dto/update-leave.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LeaveService {
    constructor(
        @InjectModel('Leave') private leaveModel: Model<ILeave>,
        private readonly usersService: UsersService, // Inject UsersService
      ) {}
    
    async create(createLeaveDto: CreateLeaveDto): Promise<any> {
        const { userId, ...leaveData } = createLeaveDto;
      
        // Check if the provided userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new BadRequestException('Invalid userId');
        }
      
        // Create the leave without checking for the existence of the user
        const createdLeave = await this.leaveModel.create({
          ...leaveData,
          userId: new mongoose.Types.ObjectId(userId),
        });
      
        return {
          message: 'Leave created successfully',
          newLeave: createdLeave,
        };
    }



    async findAll(): Promise<ILeave[]> {
        const leaveData = await this.leaveModel.find().populate('userId', 'username role').exec();
        if (!leaveData || leaveData.length === 0) {
            throw new NotFoundException('No leave data found');
        }
        return leaveData;
    }

    async getLeave(leaveId: string): Promise<ILeave> {
        const existingLeave = await this.leaveModel.findById(leaveId);
        if (!existingLeave) {
            throw new NotFoundException('Leave not found');
        }
        return existingLeave;
    }

    async updateLeave(leaveId: string, updateLeaveDto: UpdateLeaveDto): Promise<ILeave> {
        const existingLeave = await this.leaveModel.findByIdAndUpdate(leaveId, updateLeaveDto, { new: true });
        if (!existingLeave) {
            throw new NotFoundException('Leave not found');
        }
        return existingLeave;
    }

    async deleteLeave(leaveId: string): Promise<ILeave> {
        const deletedLeave = await this.leaveModel.findByIdAndDelete(leaveId);
        if (!deletedLeave) {
            throw new NotFoundException('Leave not found');
        }
        return deletedLeave;
    }

    async findLeavesByUserId(userId: string): Promise<ILeave[]> {
        const leaves = await this.leaveModel.find({ userId }).exec();
        if (!leaves) {
            throw new NotFoundException('Leaves not found for this user');
        }
        return leaves;
    }
}
