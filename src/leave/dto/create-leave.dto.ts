import { IsMongoId, IsInt, IsDateString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveDto {
   
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    duration: string;
    

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['Sick Leave', 'Vacation', 'Maternity/Paternity Leave', 'Unpaid Leave', 'Paid Leave', 'Full Day Leave', 'Half Day Leave'])
    leaveType: string;

    @ApiProperty()
    @IsOptional()
    remarks: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['Personal', 'Not Well'])
    reason: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}
