import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendService } from './sender.service';
import { SendMessageParamsType } from 'types/types';
import { RpcErrorFilter } from 'error/api-error-rpc.filter';
import { ApiError } from 'error/api.error';

@UseFilters(RpcErrorFilter)
@Controller()
export class SendController {
  constructor(private _sendService: SendService) {}

  @Post('sendMail')
  public async sendMailToClient(@Body() message: SendMessageParamsType) {
    const { email, subject, text, domainFrom, typeMessage } = message;

    return await this._sendService.sendMailToClient({
      email,
      subject,
      text,
      typeMessage,
      domainFrom,
    });
  }
}
