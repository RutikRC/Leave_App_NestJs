import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { Memo } from 'src/schemas/memo.schema';
import { User } from 'src/schemas/users.schema';
import { IMemo } from './memo.interface';

@Injectable()
export class MemoService {
  constructor(@InjectModel('Memo') private memoModel: Model<IMemo>) {}

  async create(createMemoDto: CreateMemoDto): Promise<Memo> {
    const createdMemo = new this.memoModel(createMemoDto);
    return await createdMemo.save();
  }

  async findAll(): Promise<IMemo[]> {
    return await this.memoModel.find().populate('userId', 'username role').exec();
  }

  async findOne(id: string): Promise<IMemo> {
    const memo = await this.memoModel.findById(id).populate('userId', 'username role').exec();
    if (!memo) {
      throw new NotFoundException('Memo not found');
    }
    return memo;
  }

  async update(id: string, updateMemoDto: UpdateMemoDto): Promise<IMemo> {
    return await this.memoModel.findByIdAndUpdate(id, updateMemoDto, { new: true });
  }

  async remove(id: string): Promise<IMemo> {
    return await this.memoModel.findByIdAndDelete(id);
  }
}
