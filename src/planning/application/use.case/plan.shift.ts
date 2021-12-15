import { Inject, Injectable } from "@nestjs/common";
import { Shift } from "./../../domain/shift";
import {v4 as uuidv4} from 'uuid';
import { ShiftRepository, SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";

@Injectable()
export class PlanShift{
    
    constructor(
        @Inject(SHIFT_REPOSITORY) private readonly shiftRepository:ShiftRepository
    ){}

    execute(workerId:string, date:string, shiftPosition:string):string{
        let shiftId:string = uuidv4();
        let shift:Shift = new Shift(shiftId, workerId, date, shiftPosition);
        shift.plan(this.shiftRepository);
        return shiftId;
    }
}