/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "InventoryItem_item_id_key";

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_id_key" ON "InventoryItem"("id");
