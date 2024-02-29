import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, NotFoundException } from '@nestjs/common';
import { LeaveService } from 'src/leave/leave.service';
import { CreateLeaveDto } from 'src/leave/dto/create-leave.dto';
import { ILeave } from 'src/leave/leave.interface';
import { UpdateLeaveDto } from 'src/leave/dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async createLeave(@Res() response, @Body() createLeaveDto: CreateLeaveDto) {
    try{
        const newLeave = await this.leaveService.create(createLeaveDto);
        return response.status(HttpStatus.CREATED).json({
            message: 'Leave created successfully', newLeave,
        });
    } catch(err){
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
        const GetLeave = await this.leaveService.findAll();
        return response.status(HttpStatus.OK).json({
            message: 'Leave data successfully found', GetLeave
        });
    } catch(err){
        return response.status(err.status).json(err.response);
    }
  }
  

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<ILeave> {
  //   return this.leaveService.findOne(id);
  // }

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
            return response.status(HttpStatus.OK).json({
                message: 'Leave has been found', existingLeave,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}
