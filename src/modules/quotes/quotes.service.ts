import { prisma, getRandomNumber } from "../../utils"

export async function getQuotes() {
  return prisma.quote.findMany()
}

export async function getQuote(id: number) {
  return prisma.quote.findUnique({
    where: { id }
  })
}

export async function getRandomQuote() {
  const resultLength = await prisma.quote.count()
  const id = getRandomNumber(0, resultLength)

  return prisma.quote.findUnique({
    where: { id }
  })
}