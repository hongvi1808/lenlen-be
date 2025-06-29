
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOrderDto {
  code?: string;
customerId?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
orderNumber?: number;
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
