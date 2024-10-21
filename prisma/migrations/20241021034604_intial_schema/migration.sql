/*
  Warnings:

  - Added the required column `loginProvider` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoginProvider" AS ENUM ('CREDENTIALS', 'GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "loginProvider",
ADD COLUMN     "loginProvider" "LoginProvider" NOT NULL;
