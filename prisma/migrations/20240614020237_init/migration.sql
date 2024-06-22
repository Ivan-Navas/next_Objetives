-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objetive" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/ivannavas/image/upload/v1708230081/GestorDeAhorros/Web/Rectangle_10_rgornj.svg',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Objetive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Objetive" ADD CONSTRAINT "Objetive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
