import { log } from "console";
import { getAllMoviesWithAverageScoreOverN } from "./problems/p5";
import { getAverageScoreForUser } from "./problems/p7";
import { findTheGrumpiestCriticId } from "./problems/p8";
import { deleteAllUsersWithAgeUnderN } from "./problems/p10";

getAllMoviesWithAverageScoreOverN(3).then(console.log);
