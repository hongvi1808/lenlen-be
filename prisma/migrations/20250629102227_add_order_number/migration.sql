/*
  Warnings:

  - The values [cancelled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `order_number` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Pending', 'Paid', 'Shipping', 'Shipped', 'Completed', 'Cancelled');
ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "name" TEXT NOT NULL;
