import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { Memo } from 'src/schemas/memo.schema'; // Import Memo schema instead of IMemo

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  async create(@Body() createMemoDto: CreateMemoDto): Promise<Memo> { // Change the return type to Memo
    return this.memoService.create(createMemoDto);
  }

  @Get()
  async findAll(): Promise<Memo[]> { // Change the return type to Memo[]
    return this.memoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Memo> { // Change the return type to Memo
    const memo = await this.memoService.findOne(id);
    if (!memo) {
      throw new NotFoundException('Memo not found');
    }
    return memo;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMemoDto: UpdateMemoDto): Promise<Memo> { // Change the return type to Memo
    return this.memoService.update(id, updateMemoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Memo> { // Change the return type to Memo
    return this.memoService.remove(id);
  }
}
