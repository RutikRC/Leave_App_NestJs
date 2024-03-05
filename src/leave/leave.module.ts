import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from 'src/schemas/leave.schema';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/schemas/users.schema';


@Module({
    imports: [MongooseModule.forFeature([{ name: Leave.name, schema: LeaveSchema}]),
    UsersModule,
    ],
    controllers: [LeaveController],
    providers: [LeaveService],
})
export class LeaveModule {}
