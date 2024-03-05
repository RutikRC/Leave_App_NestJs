// leave-status.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from 'src/schemas/leave-status.schema';
import { StatusController } from './leave-status.controller';
import { StatusService } from './leave-status.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class LeaveStatusModule {}
