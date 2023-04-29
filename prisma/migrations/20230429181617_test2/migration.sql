/*
  Warnings:

  - You are about to drop the column `userId` on the `userpreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `UserPreference_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userPreferenceId` VARCHAR(191) NULL,
    MODIFY `role` ENUM('BASIC', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'BASIC';

-- AlterTable
ALTER TABLE `userpreference` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `User_userPreferenceId_key` ON `User`(`userPreferenceId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userPreferenceId_fkey` FOREIGN KEY (`userPreferenceId`) REFERENCES `UserPreference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
