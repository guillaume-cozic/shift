import { Inject, Injectable } from "@nestjs/common";
import { Shift } from "../../domain/shift";
import { ShiftRepository, SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";

@Injectable()
export class GetShiftQuery{
    constructor(
        @Inject(SHIFT_REPOSITORY) private readonly shiftRepository:ShiftRepository
    ){}

    execute(id:string):Shift{
       return this.shiftRepository.get(id);     
    }
}