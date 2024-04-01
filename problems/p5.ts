
import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const starRatings = await prisma.starRating.findMany({
    include: {
      movie: true,
    },
    orderBy: [
      {
        score: "desc",
      },
    ],
  });
  const newGroup = [];

  const groupings = Object.values(
    groupBy(starRatings, (rating) => rating.movieId)
  );
  for (const movie of groupings) {
    const testMovie =
      movie.reduce((acc, item) => acc + item.score, 0) / movie.length;
    if (testMovie > n) {
      newGroup.push(movie.map((movie) => movie.movie)[0]);
    }
  }
  return newGroup;
};
