-- CreateTable
CREATE TABLE "Auctions" (
    "id" TEXT NOT NULL,
    "auction_name" TEXT NOT NULL,
    "starting_price" INTEGER NOT NULL DEFAULT 0,
    "bid_interval" INTEGER NOT NULL,
    "current_bid" INTEGER NOT NULL DEFAULT 0,
    "auction_img" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
