-- Run this in Supabase SQL Editor if Prisma migrate is unavailable:
-- https://supabase.com/dashboard/project/qocxfkxqeujrizthjsrv/sql/new

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "PinStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "ClickType" AS ENUM ('AMAZON', 'PINTEREST', 'SHARE', 'VIEW');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pin" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seoTitle" TEXT,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "pinterestTitle" TEXT,
    "pinterestDescription" TEXT,
    "metaDescription" TEXT,
    "seoKeywords" TEXT,
    "hashtags" TEXT,
    "affiliateLink" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "originalPrice" DOUBLE PRECISION,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pros" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cons" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "PinStatus" NOT NULL DEFAULT 'DRAFT',
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "isDeal" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "amazonClicks" INTEGER NOT NULL DEFAULT 0,
    "pinterestClicks" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PinImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "pinId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PinImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pinId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "pinId" TEXT,
    "type" "ClickType" NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "seoKeywords" TEXT,
    "status" "PinStatus" NOT NULL DEFAULT 'DRAFT',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PinToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE UNIQUE INDEX "Pin_slug_key" ON "Pin"("slug");
CREATE INDEX "Pin_status_createdAt_idx" ON "Pin"("status", "createdAt");
CREATE INDEX "Pin_categoryId_idx" ON "Pin"("categoryId");
CREATE INDEX "Pin_isTrending_idx" ON "Pin"("isTrending");
CREATE INDEX "Pin_saves_idx" ON "Pin"("saves");
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");
CREATE UNIQUE INDEX "Favorite_userId_pinId_key" ON "Favorite"("userId", "pinId");
CREATE INDEX "Click_type_createdAt_idx" ON "Click"("type", "createdAt");
CREATE INDEX "BlogPost_status_createdAt_idx" ON "BlogPost"("status", "createdAt");
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
CREATE UNIQUE INDEX "SiteContent_key_key" ON "SiteContent"("key");
CREATE UNIQUE INDEX "_PinToTag_AB_unique" ON "_PinToTag"("A", "B");
CREATE INDEX "_PinToTag_B_index" ON "_PinToTag"("B");

-- AddForeignKey
ALTER TABLE "Pin" ADD CONSTRAINT "Pin_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PinImage" ADD CONSTRAINT "PinImage_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Click" ADD CONSTRAINT "Click_pinId_fkey" FOREIGN KEY ("pinId") REFERENCES "Pin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "_PinToTag" ADD CONSTRAINT "_PinToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Pin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_PinToTag" ADD CONSTRAINT "_PinToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
