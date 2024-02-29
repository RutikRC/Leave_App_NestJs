import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, NotFoundException } from '@nestjs/common';
import { MemoService } from './memo.service';
import { UpdateMemoDto } from './dto/update-memo.dto';
import { CreateMemoDto } from './dto/create-memo.dto';
import { IMemo } from './memo.interface';
import { response } from 'express';


@Controller('memo')
export class MemoController {
    constructor(private readonly memoService: MemoService){}

    @Post()
    async createMemo(@Res() response, @Body() createMemoDto: CreateMemoDto){
        try{
            const newMemo = await this.memoService.createMemo(createMemoDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Memo created successfully', newMemo
            });
        } catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Memo could not be created',
                error: 'Bad request'
            });
        }
    }

   
    
    @Get()
    async getMemoData(@Res() response) {
        try {
            const GetMemo = await this.memoService.findMemoData();
            return response.status(HttpStatus.OK).json({
                message: 'Memo data successfully found', GetMemo
            });
        } catch(err){
            return response.status(err.status).json(err.response);
        }
    }


    @Get('/:id')
    async getMemo(@Res() response, @Param('id') memoId: string) {
        try {
            const existingMemo = await this.memoService.getMemo(memoId);
            return response.status(HttpStatus.OK).json({
                message: 'Memo has been found', existingMemo,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


    @Put('/:id')
    async updateMemo(@Res() response, @Param('id') memoId: string, @Body() UpdateMemoDto: UpdateMemoDto) {
        try {
            const existingMemo = await this.memoService.updateMemo(memoId, UpdateMemoDto);
            return response.status(HttpStatus.OK).json({
                message: "Memo has been updated", existingMemo,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }



    @Delete('/:id')
    async deleteMemo(@Res() response, @Param('id') memoId: string){
        try {
            const deletedMemo = await this.memoService.deleteMemo(memoId);
            return response.status(HttpStatus.OK).json({
                message : "Memo has been deleted", deletedMemo,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
