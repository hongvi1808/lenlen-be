import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PATTERNS, QUEUES } from 'src/common/rabbitmq/rabbit.contant';
import { ackMessage, nackMessage } from 'src/common/rabbitmq/rabit.util';

@Controller()
export class MailConsumer {
  @EventPattern(PATTERNS.SEND_MAIL_CREATED_ORDER)
  async handleOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log('Gửi email cho:', data.email);
      if (Math.random() < 0.4) throw new Error('Fake mail error');

      ackMessage(context);
    } catch (err) {
      console.warn('Lỗi:', err.message);
      const retries = data.retryCount ?? 0;

      if (retries < 3) {
        const channel = context.getChannelRef();
        const msg = context.getMessage();
        const newData = { ...data, retryCount: retries + 1 };
        ackMessage(context);
        channel.sendToQueue(QUEUES.MAIL, Buffer.from(JSON.stringify(newData)));
      } else {
        nackMessage(context, false);
      }
    }
  }
}