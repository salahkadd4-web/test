-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "fraisLivraison" DOUBLE PRECISION NOT NULL DEFAULT 700,
ADD COLUMN     "methodeExpedition" TEXT NOT NULL DEFAULT 'Livraison standard',
ADD COLUMN     "modePaiement" TEXT NOT NULL DEFAULT 'Paiement à la livraison';
