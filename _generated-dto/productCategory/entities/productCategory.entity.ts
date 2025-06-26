
import {ApiProperty} from '@nestjs/swagger'
import {Product} from '../../product/entities/product.entity'
import {Category} from '../../category/entities/category.entity'


export class ProductCategory {
  id: string ;
productId: string ;
product?: Product ;
categoryId: string ;
category?: Category ;
active: boolean ;
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
