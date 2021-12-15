import { Test, TestingModule } from "@nestjs/testing";
import { ShiftRepository, SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";
import { ShiftRepositoryProvider } from "../providers/providers";
import { DeleteShift } from "./delete.shift";
import { Shift } from "./../../domain/shift";

describe('delete a shift', () => {
    let deleteShift:DeleteShift;
    let shiftRepository:ShiftRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [ShiftRepositoryProvider, DeleteShift],
          }).compile();

          deleteShift = app.get(DeleteShift);
          shiftRepository = app.get(SHIFT_REPOSITORY);
    });

    it('should not delete shift when does not exist', () => {
        function execute(){
            deleteShift.execute('abcd');
        }
        expect(execute).toThrow('shift not found');
    });

    it('should delete shift', () => {
        let shift:Shift = new Shift('abcd', "gabard", "2021-01-01", '0-8');
        shiftRepository.save(shift);

        deleteShift.execute('abcd'); 

        let shiftDeleted:Shift = shiftRepository.get('abcd');
        expect(shiftDeleted).toBeUndefined();
    });
});