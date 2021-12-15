import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { DeleteShift } from "../use.case/delete.shift";
import { GetShiftQuery } from "../use.case/get.shift.query";
import { PlanShift } from "../use.case/plan.shift";
import { ShiftDto } from "./shift.dto";

@Controller('shift')
export class ShiftController {
  
  constructor(
      private readonly planShiftUseCase: PlanShift,
      private readonly deleteShiftUseCase: DeleteShift,
      private readonly getShiftQuery: GetShiftQuery,
  ) {}

  // NB I have to implement http not found here
  @Get(':id')
  getHello(@Param('id') id: string, @Res() res: Response): Response {
    return res.status(HttpStatus.OK).send(this.getShiftQuery.execute(id));
  }

  @Post()
  planShift(@Body() shiftDto: ShiftDto, @Res() res: Response, @Req() req: Request):Response{
    try{
        let id:string = this.planShiftUseCase.execute(shiftDto.worker, shiftDto.date, shiftDto.shiftPosition);
        // NB uri should not be harcoded like that
        return res.status(HttpStatus.CREATED).send({id:id, uri: 'http://'+req.hostname+':3000/shift/'+id});
    }catch(e:any){
        return res.status(HttpStatus.EXPECTATION_FAILED).send(e);
    }
  }


  // NB I have to create custom exception, shift not found and WorkerHasAlreadyAShift
  @Delete(':id')
  deleteShift(@Param('id') id: string, @Res() res: Response):Response{
    try{
        this.deleteShiftUseCase.execute(id);
        return res.status(HttpStatus.OK).send('deleted');
    }catch(e:any){
        return res.status(HttpStatus.NOT_FOUND).send(e);
    }
  }
}
