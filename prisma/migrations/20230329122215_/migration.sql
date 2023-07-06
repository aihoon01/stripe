/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_apiKey_key" ON "users"("apiKey");
