import { Module } from "@nestjs/common";
import { MailConsumer } from "./mail.consumer";

@Module({
    imports: [],
    controllers: [MailConsumer],
    providers: [],
    exports: [],
    })
export class MailConsumerModule {}