import { IsNotEmpty } from "class-validator";

export class ShiftDto {
    @IsNotEmpty()
    worker: string;

    @IsNotEmpty()
    date: string;
    
    @IsNotEmpty()
    shiftPosition: string;
}