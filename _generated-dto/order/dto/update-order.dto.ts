
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOrderDto {
  customerId?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt?: bigint;
createdBy?: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt?: bigint;
updatedBy?: string;
}
