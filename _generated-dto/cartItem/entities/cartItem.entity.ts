
import {ApiProperty} from '@nestjs/swagger'
import {Product} from '../../product/entities/product.entity'


export class CartItem {
  id: string ;
customerId: string  | null;
product?: Product ;
productId: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
quantity: number ;
alive: boolean ;
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
