import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { IMemo } from './memo.interface';
import { UsersService } from 'src/users/users/users.service'
import { LeaveService } from 'src/leave/leave.service'



@Injectable()
export class MemoService {
    constructor(@InjectModel('Memo') private memoModel: Model<IMemo>,
    private readonly usersService: UsersService,
    private readonly leaveService: LeaveService
     ) {}

  async createMemo(createMemoDto: CreateMemoDto): Promise<any> {
    const createdMemo = await new this.memoModel(createMemoDto);
    return createdMemo.save();
  }

  async findMemoData(): Promise<IMemo[]> {
    
    const memoData = await this.memoModel.find();
    if (!memoData || memoData.length === 0) {
        throw new NotFoundException('No Memo data found');
    }
    return memoData;
  }


  async updateMemo(memoId: string, updateMemoDto: UpdateMemoDto): Promise<IMemo> {
    const existingMemo = await this.memoModel.findByIdAndUpdate(memoId, updateMemoDto, {
      new: true,
    });
    if(!existingMemo) {
      throw new NotFoundException('Memo not found');
    }
    return existingMemo;
  }


  async getMemo(memoId: string): Promise<IMemo> {
    const existingMemo = await this.memoModel.findById(memoId).exec();
    if(!existingMemo) {
        throw new NotFoundException('Memo not found');
    }
    return existingMemo;
  }


  async deleteMemo(memoId: string): Promise<IMemo> {
    const deletedMemo = await this.memoModel.findByIdAndDelete(memoId);
    if (!deletedMemo) {
      throw new NotFoundException('Memo not found');
    }
    return deletedMemo;
  }

}
