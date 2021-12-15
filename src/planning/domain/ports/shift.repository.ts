import { Shift } from "../shift";

export const SHIFT_REPOSITORY = 'SHIFT_REPOSITORY';


export interface ShiftRepository{
    get(id:string):Shift;
    getByWorkerAndDate(worker:string, date:string):Array<Shift>;
    save(shift:Shift);
    delete(id:string);
}