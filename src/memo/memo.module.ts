import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo, MemoSchema } from 'src/schemas/memo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Memo.name, schema: MemoSchema }])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
