/*
  Warnings:

  - You are about to drop the column `money` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('STOCK', 'STRUCTURE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "money";

-- CreateTable
CREATE TABLE "SaveGame" (
    "id" TEXT NOT NULL,
    "money" INTEGER NOT NULL,

    CONSTRAINT "SaveGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "item_type" "ItemType" NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "item_id" INTEGER NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StoreObject" (
    "item_id" INTEGER NOT NULL,
    "store_id" TEXT NOT NULL,
    "x_pos" DECIMAL(65,30) NOT NULL,
    "y_pos" DECIMAL(65,30) NOT NULL,
    "z_pos" DECIMAL(65,30) NOT NULL,
    "y_rot" DECIMAL(65,30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SaveGame_id_key" ON "SaveGame"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_key" ON "Store"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_id_key" ON "Inventory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_item_id_key" ON "InventoryItem"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_inventory_id_key" ON "InventoryItem"("inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreObject_item_id_key" ON "StoreObject"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreObject_store_id_key" ON "StoreObject"("store_id");

-- AddForeignKey
ALTER TABLE "SaveGame" ADD CONSTRAINT "SaveGame_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_id_fkey" FOREIGN KEY ("id") REFERENCES "SaveGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_id_fkey" FOREIGN KEY ("id") REFERENCES "SaveGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreObject" ADD CONSTRAINT "StoreObject_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreObject" ADD CONSTRAINT "StoreObject_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
