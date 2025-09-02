-- CreateTable
CREATE TABLE "UserVerify" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isVerify" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVerify_pkey" PRIMARY KEY ("id")
);
