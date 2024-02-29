import { IsInt, IsDateString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    leaveId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['Approved', 'Rejected', 'Under Scrunity'])
    status: string;
}