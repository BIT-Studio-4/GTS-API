/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `StoreObject` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StoreObject_item_id_key";

-- AlterTable
ALTER TABLE "StoreObject" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StoreObject_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreObject_id_key" ON "StoreObject"("id");
