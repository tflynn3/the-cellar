import { prisma } from '@/lib/db';
import { Wine } from '@prisma/client';

export async function getWines() {
  return prisma.wine.findMany({
    include: {
      consumed: true,
    },
    orderBy: {
      purchaseDate: 'desc',
    },
  });
}

export async function getWine(id: string) {
  return prisma.wine.findUnique({
    where: { id },
    include: {
      consumed: true,
    },
  });
}

export async function createWine(wine: Omit<Wine, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.wine.create({
    data: wine,
    include: {
      consumed: true,
    },
  });
}

export async function updateWine(id: string, wine: Partial<Wine>) {
  return prisma.wine.update({
    where: { id },
    data: wine,
    include: {
      consumed: true,
    },
  });
}

export async function deleteWine(id: string) {
  return prisma.wine.delete({
    where: { id },
  });
}

export async function markWineAsConsumed(
  wineId: string,
  consumedData: {
    rating: number;
    dateDrank: Date;
    wouldBuyAgain: boolean;
    foodPairings: string[];
    experience?: string;
  }
) {
  return prisma.consumed.create({
    data: {
      ...consumedData,
      wine: {
        connect: { id: wineId },
      },
    },
  });
}