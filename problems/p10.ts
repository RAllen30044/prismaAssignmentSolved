import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const users = await prisma.user.findMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  const transactions = [];

  for (const user of users) {
    transactions.push(
      prisma.starRating.deleteMany({
        where: {
          userId: user.id,
        },
      })
    );
    transactions.push(
      prisma.user.delete({
        where: {
          id: user.id,
        },
      })
    );
  }

  return await prisma.$transaction(transactions);
};
