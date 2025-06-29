
import {OrderStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OrderDto {
  id: string ;
code: string ;
customerId: string  | null;
@ApiProperty({
  type: `number`,
  format: `float`,
})
totalPrice: number ;
@ApiProperty({
  enum: OrderStatus,
})
status: OrderStatus ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
orderNumber: number ;
active: boolean ;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
createdAt: bigint ;
createdBy: string ;
@ApiProperty({
  type: `integer`,
  format: `int64`,
})
updatedAt: bigint ;
updatedBy: string ;
}
