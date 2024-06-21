import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import { Injectable } from '@nestjs/common';

import { DELAY_SEND_MAIL, EMAIL_SENDER, HOST_SENDER, PASSWORD_SENDER, PORT_SENDER } from 'utils/env';
import { templateBrandingMail } from './utils/templates';
import { SendMessageParamsType } from 'types/types';
import { ApiError } from 'error/api.error';
import { TradingEmailLicense } from './templates/trading-email';

@Injectable()
export class SendService {
  private _transporter;
  constructor() {
    const options: Options = {
      host: HOST_SENDER,
      port: +PORT_SENDER,
      secure: true,
      auth: {
        user: EMAIL_SENDER,
        pass: PASSWORD_SENDER,
      },
      tls: {
        rejectUnauthorized: false,
      },
      dnsTimeout: DELAY_SEND_MAIL ?? 100000,
      connectionTimeout: DELAY_SEND_MAIL ?? 100000,
    };
    this._transporter = nodemailer.createTransport<Options>(options);
  }

  async sendMailToClient({ emailFrom, email, subject, text, domainFrom }: SendMessageParamsType): Promise<string> {
    try {
      await this._transporter.sendMail(
        {
          from: `${domainFrom} <${emailFrom}>`,
          messageId: `protocol-mail-${this._generateOrderId()}`,
          sender: domainFrom,
          date: new Date(),
          to: email,
          subject: subject,
          html: render(TradingEmailLicense({ licenseKey: text })), // html body
        },
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log('connection success => ', result);
        },
      );

      return 'Mail was be sended!';
    } catch (error: unknown) {
      const { status, message } = error as { status: number; message: string };
      throw new ApiError(status, message);
    }
  }

  private _generateOrderId(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
