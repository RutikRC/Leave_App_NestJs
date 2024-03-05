import { IsInt, IsDateString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    userId: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    leaveId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['approved', 'rejected', 'under scrunity'])
    status: string;
}