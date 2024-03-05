import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, NotFoundException } from '@nestjs/common';
import { LeaveService } from 'src/leave/leave.service';
import { CreateLeaveDto } from 'src/leave/dto/create-leave.dto';
import { ILeave } from 'src/leave/leave.interface';
import { UpdateLeaveDto } from 'src/leave/dto/update-leave.dto';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Controller('leave')
export class LeaveController {
    constructor(
        private readonly leaveService: LeaveService,
        private readonly usersService: UsersService, // Inject UsersService
      ) {}
  @Post()
  async createLeave(@Res() response, @Body() createLeaveDto: CreateLeaveDto) {
    try{
        const newLeave = await this.leaveService.create(createLeaveDto);
        return response.status(HttpStatus.CREATED).json({
            message: 'Leave created successfully', newLeave,
        });
    } catch(err){
        console.log(err);
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Leave not created!',
            error: 'Bad request'
        });
    }
  }


  @Get()
  async getLeaveData(@Res() response) {
    try {
      const leaveData = await this.leaveService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Leave data successfully found',
        leaveData: leaveData.map(leave => ({
          _id: leave._id,
          duration: leave.duration,
          leaveType: leave.leaveType,
          remarks: leave.remarks,
          reason: leave.reason,
          userId: {
            _id: leave.userId._id,
            username: leave.userId.username,
            role: leave.userId.role,
          },
          leave_create_date: leave.leave_create_date,
        })),
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  


  @Put('/:id')
  async updateLeave(@Res() response, @Param('id') leaveId: string, @Body() UpdateLeaveDto: UpdateLeaveDto) {
    try {
        const existingLeave = await this.leaveService.updateLeave(leaveId, UpdateLeaveDto);
        return response.status(HttpStatus.OK).json({
            message: "Leave has been updated", existingLeave,});
    } catch (err) {
        return response.status(err.status).json(err.response);
    }
    }

    @Delete('/:id')
    async deleteLeave(@Res() response, @Param('id') leaveId: string){
        try {
            const deletedLeave = await this.leaveService.deleteLeave(leaveId);
            return response.status(HttpStatus.OK).json({
                message : "Leave has been deleted", deletedLeave,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getLeave(@Res() response, @Param('id') leaveId: string) {
    try {
      const existingLeave = await this.leaveService.getLeave(leaveId);
      if (!existingLeave) {
        throw new NotFoundException('Leave not found');
      }

      // Fetch user details associated with the leave
      const userId = existingLeave.userId;
      const user = await this.usersService.getUserById(userId._id);

      // Construct response with user details
      const leaveData = {
        ...existingLeave.toJSON(),
        userId: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      };

      return response.status(HttpStatus.OK).json({
        message: 'Leave has been found',
        leaveData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get('user/:userId')
    async getLeavesByUserId(@Res() response, @Param('userId') userId: string) {
        try {
            const leaves = await this.leaveService.findLeavesByUserId(userId);
            return response.status(HttpStatus.OK).json({
                message: 'Leaves found for the user',
                leaves,
            });
        } catch (err) {
            if (err instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: err.message,
                });
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
            });
        }
    }

}
