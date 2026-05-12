-- CreateEnum
CREATE TYPE "NiveauAbonnement" AS ENUM ('NIVEAU_0', 'NIVEAU_1', 'NIVEAU_2', 'NIVEAU_3');

-- CreateEnum
CREATE TYPE "StatutAbonnement" AS ENUM ('GRATUIT', 'ACTIF', 'EXPIRE', 'SUSPENDU');

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "variantId" TEXT,
ADD COLUMN     "variantOptionId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "approbationsVendeurs" JSONB;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "variantId" TEXT,
ADD COLUMN     "variantNom" TEXT,
ADD COLUMN     "variantOptionId" TEXT,
ADD COLUMN     "variantOptionValeur" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "prixVariables" JSONB,
ADD COLUMN     "typeOption" TEXT;

-- AlterTable
ALTER TABLE "VendeurProfile" ADD COLUMN     "prioriteAffichage" INTEGER NOT NULL DEFAULT 3;

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "couleur" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" TEXT NOT NULL,
    "vendeurId" TEXT NOT NULL,
    "niveau" "NiveauAbonnement" NOT NULL DEFAULT 'NIVEAU_3',
    "statut" "StatutAbonnement" NOT NULL DEFAULT 'GRATUIT',
    "dateDebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "periodicite" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" TEXT NOT NULL,
    "abonnementId" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "dateReglement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "methode" TEXT NOT NULL,
    "reference" TEXT,
    "note" TEXT,
    "confirmeParAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Abonnement_vendeurId_key" ON "Abonnement"("vendeurId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_vendeurId_fkey" FOREIGN KEY ("vendeurId") REFERENCES "VendeurProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "Abonnement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "VariantOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantOptionId_fkey" FOREIGN KEY ("variantOptionId") REFERENCES "VariantOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
