
import {OrderStatus} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {OrderItem} from '../../orderItem/entities/orderItem.entity'
import {Payment} from '../../payment/entities/payment.entity'


export class Order {
  id: string ;
customerId: string ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
totalPrice: number ;
@ApiProperty({
  enum: OrderStatus,
})
status: OrderStatus ;
orderItems?: OrderItem[] ;
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
payments?: Payment[] ;
}
