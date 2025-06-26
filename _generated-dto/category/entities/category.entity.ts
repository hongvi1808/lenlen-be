
import {ApiProperty} from '@nestjs/swagger'
import {ProductCategory} from '../../productCategory/entities/productCategory.entity'


export class Category {
  id: string ;
name: string ;
slug: string ;
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
ProductCategory?: ProductCategory[] ;
}
