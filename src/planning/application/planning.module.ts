import { Module } from '@nestjs/common';
import { ShiftController } from './controller/shift.controller';
import { ShiftRepositoryProvider } from './providers/providers';
import { DeleteShift } from './use.case/delete.shift';
import { GetShiftQuery } from './use.case/get.shift.query';
import { PlanShift } from './use.case/plan.shift';

@Module({
  imports: [],
  controllers: [ShiftController],
  providers: [ShiftRepositoryProvider, PlanShift, DeleteShift, GetShiftQuery],
})
export class PlanningModule {}
