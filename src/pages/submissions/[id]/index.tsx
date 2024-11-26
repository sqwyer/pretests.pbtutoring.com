import { useRouter } from "next/router";
import { PageLayout } from "~/pages";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import type { Answer, Prisma, QuestionCategory } from "@prisma/client";
import { cn } from "~/lib/utils";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner className="h-8 w-8" />
    </div>
  );
}

function calculateCategoryScore(
  submission: FullSubmission,
  category: QuestionCategory,
) {
  const predictedCorrect = Math.round(
    (categoryTotalQuestions[category] *
      submission.answers.filter(
        (ans) =>
          ans.questionCategory === category &&
          ans.choice === ans.questionAnswer,
      ).length) /
      submission.answers.filter((ans) => ans.questionCategory === category)
        .length,
  );

  const predictedIncorrect =
    categoryTotalQuestions[category] - predictedCorrect;

  return {
    predictedCorrect,
    predictedIncorrect,
  };
}

function calculateOverallScore(submission: FullSubmission) {
  const totalPredictedCorrect =
    calculateCategoryScore(submission, "ALGEBRA").predictedCorrect +
    calculateCategoryScore(submission, "FUNCTIONS").predictedCorrect +
    calculateCategoryScore(submission, "GEOMETRY").predictedCorrect +
    calculateCategoryScore(submission, "INTEGRATING_ESSENTIAL_SKILLS")
      .predictedCorrect +
    calculateCategoryScore(submission, "NUMBERS_AND_QUANTITY")
      .predictedCorrect +
    calculateCategoryScore(submission, "STATISTICS_AND_PROBABILITY")
      .predictedCorrect;

  console.log(
    totalPredictedCorrect,
    totalPredictedCorrect / 60,
    (totalPredictedCorrect / 60) * 36,
  );

  return { score: (totalPredictedCorrect / 60) * 36, totalPredictedCorrect };
}

const categoryNames: Record<QuestionCategory, string> = {
  ALGEBRA: "Alegbra",
  FUNCTIONS: "Functions",
  GEOMETRY: "Geometry",
  INTEGRATING_ESSENTIAL_SKILLS: "Essential Skills",
  MODELING: "Modeling",
  NUMBERS_AND_QUANTITY: "Nums. and Quantity",
  STATISTICS_AND_PROBABILITY: "Stats. and Prob.",
};

const categoryTotalQuestions: Record<QuestionCategory, number> = {
  ALGEBRA: 8,
  FUNCTIONS: 8,
  GEOMETRY: 8,
  INTEGRATING_ESSENTIAL_SKILLS: 25,
  MODELING: 0,
  NUMBERS_AND_QUANTITY: 5,
  STATISTICS_AND_PROBABILITY: 6,
};

function categorizeAnswers(answers: Answer[]) {
  let categories: {
    category: QuestionCategory;
    answers: Answer[];
  }[] = [];

  answers.forEach((answer) => {
    if (
      categories.find(
        (category) => category.category === answer.questionCategory,
      )
    ) {
      categories = categories.map((category) => {
        if (category.category === answer.questionCategory)
          return {
            ...category,
            answers: [...category.answers, answer],
          };
        else return category;
      });
    } else {
      categories.push({
        category: answer.questionCategory,
        answers: [answer],
      });
    }
  });

  console.log(categories);

  return categories;
}

type FullSubmission = Prisma.SubmisionGetPayload<{
  include: {
    answers: true;
  };
}>;

function hasAllCategories(submission: FullSubmission) {
  if (!submission.answers.find((ans) => ans.questionCategory === "ALGEBRA"))
    return false;
  if (!submission.answers.find((ans) => ans.questionCategory === "FUNCTIONS"))
    return false;
  if (!submission.answers.find((ans) => ans.questionCategory === "GEOMETRY"))
    return false;
  if (
    !submission.answers.find(
      (ans) => ans.questionCategory === "INTEGRATING_ESSENTIAL_SKILLS",
    )
  )
    return false;
  // if(!submission.answers.find(ans => ans.questionCategory === "MODELING")) return false;
  if (
    !submission.answers.find(
      (ans) => ans.questionCategory === "NUMBERS_AND_QUANTITY",
    )
  )
    return false;
  if (
    !submission.answers.find(
      (ans) => ans.questionCategory === "STATISTICS_AND_PROBABILITY",
    )
  )
    return false;

  return true;
}

function Guage({ score, className }: { score: number; className?: string }) {
  return (
    <div className={cn("relative size-40", className)}>
      <svg
        className="size-full rotate-[135deg]"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle (Gauge) --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200"
          strokeWidth="1.5"
          strokeDasharray="75 100"
          strokeLinecap="round"
        ></circle>

        {/* <!-- Gauge Progress --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-blue-600"
          strokeWidth="1.5"
          strokeDasharray={`${(score / 36) * 75} 100`}
          strokeLinecap="round"
        ></circle>
      </svg>

      {/* <!-- Value Text --> */}
      <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
        <span className="text-4xl font-bold text-blue-600">{score}</span>
        <span className="block text-xs text-blue-600">Math ACT</span>
      </div>
    </div>
  );
}

function SubmissionDetails({ id }: { id: string }) {
  const { data: submissionData, status: submissionStatus } =
    api.submission.get.useQuery({
      id: id,
    });

  return (
    <>
      {submissionStatus === "pending" && <Loading />}
      {submissionStatus === "error" && <p>Error loading submission</p>}
      {submissionStatus === "success" && (
        <div className="bg-blue-700">
          <section className="p-4">
            {/* header */}
            <p className="text-center text-sm font-medium text-white">
              Submission Breakdown
            </p>
          </section>
          <section className="w-full rounded-t-lg bg-white p-8 md:px-4">
            {/* content */}
            <div className="mx-auto w-full max-w-2xl">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2">
                    <div className="relative h-5 w-5 overflow-hidden rounded-full border bg-gray-100">
                      <svg
                        className="absolute -left-[3px] h-6 w-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-400">
                      {submissionData?.name}
                    </p>
                  </div>
                  <h1 className="text-3xl font-medium">Your score breakdown</h1>
                  <p className="text-sm text-gray-600">
                    Submitted at{" "}
                    {submissionData?.createdAt.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    on{" "}
                    {submissionData?.createdAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {categorizeAnswers(submissionData!.answers).map((category) => (
                  <div
                    className="flex flex-col rounded-md border shadow-sm"
                    key={category.category}
                  >
                    <div className="flex flex-col gap-2 p-4">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-xl font-medium">
                          {categoryNames[category.category]}
                        </p>
                        <p className="text-sm text-gray-600">
                          {
                            category.answers.filter(
                              (ans) => ans.choice === ans.questionAnswer,
                            ).length
                          }
                          /{category.answers.length} (
                          {Math.round(
                            (category.answers.filter(
                              (ans) => ans.choice === ans.questionAnswer,
                            ).length /
                              category.answers.length) *
                              100,
                          )}
                          %)
                        </p>
                      </div>
                      <div
                        className={
                          "grid h-4 w-full gap-[1px] rounded-md border bg-gray-200"
                        }
                        style={{
                          gridTemplateColumns: `repeat(${category.answers.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {category.answers
                          .filter((ans) => ans.choice === ans.questionAnswer)
                          .map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={category.category + "_cat_incorrect_" + key}
                            />
                          ))}
                        {category.answers
                          .filter((ans) => ans.choice !== ans.questionAnswer)
                          .map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={category.category + "_cat_incorrect_" + key}
                            />
                          ))}
                      </div>
                    </div>
                    {/* <Link
                      href="#"
                      className="flex flex-row items-center justify-center gap-2 rounded-b-md border-t bg-gray-100 py-1.5 text-sm text-gray-600 duration-75 hover:bg-gray-200 hover:text-black"
                    >
                      <p>Review Answers</p>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link> */}
                  </div>
                ))}
                <Link
                  href={`/submissions/${id}/review`}
                  className="flex flex-row items-center justify-center gap-1 rounded-md border bg-gray-50 p-2 text-sm font-medium duration-75 hover:bg-gray-100"
                >
                  <p>Review my answers</p>
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>

              {submissionData && hasAllCategories(submissionData) && (
                <>
                  <hr className="my-8" />

                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-medium">
                      ACT Score Prediction
                    </h1>
                    <p className="text-sm text-gray-600">
                      This score is based on a limited number of questions and
                      is{" "}
                      <span className="underline">
                        likely not reflective of your true score
                      </span>
                      .
                    </p>
                  </div>

                  <div className="mt-4 flex w-full flex-col gap-6 sm:flex-row">
                    <div className="rounded-md border p-5 shadow-sm">
                      <Guage
                        score={Math.round(
                          calculateOverallScore(submissionData).score,
                        )}
                        className="mx-auto my-auto h-full"
                      />
                    </div>
                    <div className="grid flex-1 grid-cols-2 gap-2">
                      {/* <div className="">
                      <p>Algebra</p>
                      <p>8/8</p>
                    </div> */}
                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Algebra</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {Math.round(
                              (8 *
                                submissionData.answers.filter(
                                  (ans) =>
                                    ans.questionCategory === "ALGEBRA" &&
                                    ans.choice === ans.questionAnswer,
                                ).length) /
                                submissionData.answers.filter(
                                  (ans) => ans.questionCategory === "ALGEBRA",
                                ).length,
                            )}
                            /8 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-8 gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(submissionData, "ALGEBRA")
                                .predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"alg_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(submissionData, "ALGEBRA")
                                .predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"alg_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Functions</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {
                              calculateCategoryScore(
                                submissionData,
                                "FUNCTIONS",
                              ).predictedCorrect
                            }
                            /8 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-8 gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "FUNCTIONS",
                              ).predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"func_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "FUNCTIONS",
                              ).predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"func_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Geometry</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {
                              calculateCategoryScore(submissionData, "GEOMETRY")
                                .predictedCorrect
                            }
                            /8 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-8 gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(submissionData, "GEOMETRY")
                                .predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"geo+_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(submissionData, "GEOMETRY")
                                .predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"geo_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Num & Quant</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {
                              calculateCategoryScore(
                                submissionData,
                                "NUMBERS_AND_QUANTITY",
                              ).predictedCorrect
                            }
                            /5 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-5 gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "NUMBERS_AND_QUANTITY",
                              ).predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"nq_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "NUMBERS_AND_QUANTITY",
                              ).predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"nq_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Stat & Prob</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {
                              calculateCategoryScore(
                                submissionData,
                                "STATISTICS_AND_PROBABILITY",
                              ).predictedCorrect
                            }
                            /6 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-6 gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "STATISTICS_AND_PROBABILITY",
                              ).predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"stat_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "STATISTICS_AND_PROBABILITY",
                              ).predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"stat_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2 shadow-sm">
                        <div className="flex flex-col">
                          <p className="font-medium">Essential Skills</p>
                          <p className="text-xs text-gray-600">
                            (predicted{" "}
                            {
                              calculateCategoryScore(
                                submissionData,
                                "INTEGRATING_ESSENTIAL_SKILLS",
                              ).predictedCorrect
                            }
                            /25 correct)
                          </p>
                        </div>
                        <div className="grid h-3 grid-cols-[repeat(25,minmax(0,1fr))] gap-[1px] rounded-sm border bg-gray-200">
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "INTEGRATING_ESSENTIAL_SKILLS",
                              ).predictedCorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-green-500"
                              key={"ies_correct" + key}
                            />
                          ))}
                          {Array.from(
                            Array(
                              calculateCategoryScore(
                                submissionData,
                                "INTEGRATING_ESSENTIAL_SKILLS",
                              ).predictedIncorrect,
                            ),
                          ).map((_, key) => (
                            <span
                              className="bg-gray-100"
                              key={"ies_incorrect" + key}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default function Submission() {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  return (
    <PageLayout>{id ? <SubmissionDetails id={id} /> : <Loading />}</PageLayout>
  );
}
