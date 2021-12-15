import { ShiftRepository } from "./ports/shift.repository";

export class Shift{
    
    constructor(
        private id:string, 
        private worker:string, 
        private date:string, 
        private shiftPosition:string
    ){}

    getId():string{
        return this.id;
    }

    getWorker():string{
        return this.worker;
    }

    getDate():string{
        return this.date;
    }


    plan(shiftRepository:ShiftRepository){
        this.checkIfWorkerHasAlreadyShiftForThisDayS(shiftRepository);
        shiftRepository.save(this);
    }

    delete(shiftRepository:ShiftRepository){
        shiftRepository.delete(this.id);
    }

    private checkIfWorkerHasAlreadyShiftForThisDayS(shiftRepository: ShiftRepository) {
        let shifts: Array<Shift> = shiftRepository.getByWorkerAndDate(this.worker, this.date);
        if (shifts.length > 0) {
            throw 'worker has already a shift for this day';
        }
    }
}