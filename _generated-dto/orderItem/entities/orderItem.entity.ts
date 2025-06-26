
import {ApiProperty} from '@nestjs/swagger'
import {Order} from '../../order/entities/order.entity'
import {Product} from '../../product/entities/product.entity'


export class OrderItem {
  id: string ;
orderId: string ;
order?: Order ;
productId: string ;
product?: Product ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
price: number ;
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
