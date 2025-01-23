import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const zQuestionCategory = z.enum([
  "NUMBERS_AND_QUANTITY",
  "ALGEBRA",
  "FUNCTIONS",
  "GEOMETRY",
  "STATISTICS_AND_PROBABILITY",
  "INTEGRATING_ESSENTIAL_SKILLS",
  "MODELING",
]);

const zAnswer = z.object({
  questionContent: z.string(),
  a: z.string(), // ans 0
  b: z.string(), // ans 1
  c: z.string(), // ans 2
  d: z.string(), // ans 3
  e: z.string(), // ans 4
  questionAnswer: z.number().int().min(0).max(4),
  questionCategory: zQuestionCategory,
  choice: z.number().int().min(0).max(4).nullable().optional().default(null), // selected answer
});

export const submissionRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.submision.findMany({
      include: {
        answers: true,
      },
    });
  }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.submision.findUnique({
        where: {
          id: input.id,
        },
        include: {
          answers: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email().optional(),
        answers: z.array(zAnswer),
        testLabel: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const submission = await ctx.db.submision.create({
        data: {
          name: input.name,
          email: input.email,
          testLabel: input.testLabel,
          answers: {
            createMany: {
              data: input.answers.map((answer) => ({
                questionContent: answer.questionContent,
                a: answer.a,
                b: answer.b,
                c: answer.c,
                d: answer.d,
                e: answer.e,
                questionCategory: answer.questionCategory,
                questionAnswer: answer.questionAnswer,
                choice: answer.choice,
              })),
            },
          },
        },
        include: {
          answers: true,
        },
      });

      return { submission };
    }),
});
