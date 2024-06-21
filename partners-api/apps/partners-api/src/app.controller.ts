import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// http://localhost:3000/prefixo/test
// @Controller('prefixo')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }
}
