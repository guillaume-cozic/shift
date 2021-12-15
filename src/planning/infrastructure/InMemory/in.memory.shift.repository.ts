import { Injectable } from "@nestjs/common";
import { Shift } from "./../../domain/shift";
import { ShiftRepository } from "../../domain/ports/shift.repository";


// for testing purpose in production I will use another implementation of ShiftRepository => maybe SqlShiftRepository

@Injectable()
export class InMemoryShiftRepository implements ShiftRepository {
    
    private shifts: Array<Shift> = [];

    get(id: string): Shift {
        return this.shifts.find(shift => shift.getId() === id);
    }

    save(shift: Shift) {
        this.shifts.push(shift);
    }

    getByWorkerAndDate(worker:string, date:string):Shift[]{
       return this.shifts.filter(shift => shift.getWorker() === worker && shift.getDate() === date);
    }

    delete(id: string) {
        let index:number = this.shifts.findIndex(shift => shift.getId() === id);
        this.shifts.splice(index, 1);
    }
}
