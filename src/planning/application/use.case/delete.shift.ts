import { Inject } from "@nestjs/common";
import { Shift } from "src/planning/domain/shift";
import { ShiftRepository, SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";

export class DeleteShift{

    constructor(
        @Inject(SHIFT_REPOSITORY) private readonly shiftRepository:ShiftRepository
    ){}

    execute(id:string){
        let shift:Shift = this.shiftRepository.get(id);
        if(shift === null || typeof shift == 'undefined'){
            throw 'shift not found';
        }
        shift.delete(this.shiftRepository);
    }
}