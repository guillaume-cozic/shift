import { SHIFT_REPOSITORY } from "./../../domain/ports/shift.repository";
import { InMemoryShiftRepository } from "../../infrastructure/InMemory/in.memory.shift.repository";

export const ShiftRepositoryProvider = {
    provide: SHIFT_REPOSITORY,
    useClass:
      process.env.NODE_ENV === 'development'
        ? InMemoryShiftRepository
        : InMemoryShiftRepository,
  };