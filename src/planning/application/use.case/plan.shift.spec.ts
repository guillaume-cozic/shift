import { Test, TestingModule } from "@nestjs/testing";
import { Shift } from "./../../domain/shift";
import { ShiftRepositoryProvider } from "../providers/providers";
import { ShiftRepository, SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";
import { PlanShift } from "./plan.shift";

describe('Plan a shift for a worker', () => {
    let planShift:PlanShift;
    let shiftRepository:ShiftRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [ShiftRepositoryProvider, PlanShift],
          }).compile();
          planShift = app.get(PlanShift);
          shiftRepository = app.get(SHIFT_REPOSITORY);
    });

    describe('should plan a shift for a worker', () => {
        it('should plan first shift for a worker', () => {

            let shiftId:string = planShift.execute("gabard", '2021-01-01', '0-8');

            let shiftPlanned:Shift = shiftRepository.get(shiftId);
            let shiftExpected:Shift = new Shift(shiftId, "gabard", "2021-01-01", '0-8');
            expect(shiftPlanned).toEqual(shiftExpected);
        });
    })


    describe('should not plan a shift', () => {
        it('worker can not have two shifts per day', () => {
            let shift:Shift = new Shift('abcd', "gabard", "2021-01-01", '0-8');
            shiftRepository.save(shift);

            function executeUseCase(){                
                planShift.execute('gabard', '2021-01-01', '8-16');
            }
            expect(executeUseCase).toThrow('worker has already a shift for this day');
        });

    });
});