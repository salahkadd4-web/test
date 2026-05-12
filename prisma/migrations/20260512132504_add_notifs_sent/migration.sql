-- AlterTable
ALTER TABLE "Abonnement" ADD COLUMN     "notifsSent" TEXT[] DEFAULT ARRAY[]::TEXT[];
