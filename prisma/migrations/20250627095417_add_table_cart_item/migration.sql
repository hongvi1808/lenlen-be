/*
  Warnings:

  - You are about to drop the column `create_by` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `product_category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,code]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `product_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "create_by",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "create_by",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "created_by" TEXT NOT NULL,
ALTER COLUMN "customer_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "create_by",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "create_by",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "create_by",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_category" DROP COLUMN "create_by",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cart_item" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "alive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" BIGINT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_at" BIGINT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_id_product_id_key" ON "cart_item"("id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_code_key" ON "order"("id", "code");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
