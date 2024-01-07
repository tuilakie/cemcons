import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { GovReportRes, GovReportReq } from './dto/gov-report.dto';

@ApiBasicAuth()
@ApiTags('cemcons-report')
@Controller('baocao')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('gov')
  getGOVreport(@Body() req: GovReportReq): Promise<GovReportRes> {
    return this.appService.getGOVreport(req);
  }
}
