-- CreateTable
CREATE TABLE "PasswordRecover" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "isVerify" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordRecover_pkey" PRIMARY KEY ("id")
);
