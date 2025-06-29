
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateOrderDto {
  id: string;
code: string;
customerId?: string;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
orderNumber: number;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt: bigint;
createdBy: string;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt: bigint;
updatedBy: string;
}
