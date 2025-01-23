import type { Answer } from "@prisma/client";
import { useRef, useState } from "react";
import { Question } from "./Question";
import { api } from "~/utils/api";
import { ExternalLinkIcon, TriangleAlertIcon } from "lucide-react";
import { QuestionSelector } from "./QuestionSelector";
import Link from "next/link";

export type QuestionType = {
  questionContent: string;
  questionAnswer: number;
  questionCategory:
    | "NUMBERS_AND_QUANTITY"
    | "ALGEBRA"
    | "FUNCTIONS"
    | "GEOMETRY"
    | "STATISTICS_AND_PROBABILITY"
    | "INTEGRATING_ESSENTIAL_SKILLS"
    | "MODELING";

  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
};

export type TestType = {
  name: string;
  questions: QuestionType[];
};

type AnswerInProgress = Omit<Answer, "id" | "submissionId">;

function generateEmptyAnswers(test: TestType) {
  const answers: AnswerInProgress[] = test.questions.map((question) => ({
    questionContent: question.questionContent,
    questionAnswer: question.questionAnswer,
    questionCategory: question.questionCategory,
    a: question.a,
    b: question.b,
    c: question.c,
    d: question.d,
    e: question.e,
    choice: null,
  }));

  return answers;
}

export function Test({ test }: { test: TestType }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(generateEmptyAnswers(test));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitInputRef = useRef<HTMLInputElement>(null);

  const createSubmissionMutation = api.submission.create.useMutation();

  const createSubmission = () => {
    setLoading(true);
    createSubmissionMutation.mutate(
      {
        answers,
        name,
        testLabel: test.name,
      },
      {
        onSuccess: (data) =>
          window.open(`/submissions/${data.submission.id}`, "_self"),
        onError: (error) => {
          alert("An error occured.");
          console.log(error);
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="bg-blue-700">
      <div className="flex flex-col gap-4 bg-blue-700 px-4 py-4 sm:px-8">
        <p className="grid items-center text-center text-sm font-medium text-white sm:grid-cols-3">
          <span className="hidden text-left sm:inline-block">
            Pulliam-Bivens Tutoring
          </span>
          <span>{test.name}</span>
          <span className="hidden text-right sm:inline-block">
            <Link
              className="ml-auto flex h-6 w-6 cursor-pointer items-center gap-1 rounded-md duration-75 hover:bg-blue-600"
              href="/"
            >
              <ExternalLinkIcon className="mx-auto h-4 w-4 -rotate-90" />
            </Link>
          </span>
        </p>
        <QuestionSelector
          currentQuestion={currentQuestion}
          onChangeQuestion={(question) => setCurrentQuestion(question)}
          questions={test.questions.length}
          showSubmit={true}
        />
      </div>
      <div className="w-full rounded-t-lg bg-white p-4">
        {test.questions[currentQuestion] && (
          <Question
            answer={
              answers[currentQuestion]?.choice as 0 | 1 | 2 | 3 | 4 | null
            }
            question={test.questions[currentQuestion]}
            onChangeAnswer={(choice) =>
              setAnswers((prevAnswers) =>
                prevAnswers.map((mappedAnswer, mappedAnswerIndex) =>
                  mappedAnswerIndex === currentQuestion
                    ? {
                        ...mappedAnswer,
                        choice,
                      }
                    : mappedAnswer,
                ),
              )
            }
            onChangeQuestion={(direction) =>
              setCurrentQuestion((prev) =>
                prev + direction < 0 ? 0 : prev + direction,
              )
            }
            previousDisabled={currentQuestion === 0}
            finalQuestion={currentQuestion === test.questions.length - 1}
          />
        )}

        {currentQuestion >= test.questions.length && (
          <>
            <p className="text-xs text-gray-600">(nq_SUBMIT)</p>
            <div className="mx-auto mt-4 flex max-w-3xl flex-col gap-8 rounded-md border p-8 shadow-md">
              {answers.filter((ans) => ans.choice === null).length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="flex flex-row items-center gap-2 text-sm">
                    <TriangleAlertIcon className="h-4 w-4" />
                    <span>
                      Warning! You left{" "}
                      {answers.filter((ans) => ans.choice === null).length}{" "}
                      question
                      {answers.filter((ans) => ans.choice === null).length !==
                        1 && "s"}{" "}
                      unanswered.
                    </span>
                  </p>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(24px,38px))] gap-2">
                    {answers
                      .filter((ans) => ans.choice === null)
                      .map((_, ansIndex) => (
                        <button
                          className="aspect-square border border-blue-700 text-blue-700 duration-75 hover:bg-blue-100"
                          onClick={() => setCurrentQuestion(ansIndex)}
                          key={"goto_q_" + ansIndex}
                        >
                          {ansIndex + 1}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="group relative">
                  <p
                    className="absolute left-[calc(1rem+1px)] top-[18px] bg-white px-1 text-sm text-gray-400 duration-100 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-black"
                    onClick={() =>
                      submitInputRef.current && submitInputRef.current.focus()
                    }
                  >
                    Name
                  </p>
                  <input
                    value={name}
                    ref={submitInputRef}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-md border px-4 py-2"
                  />
                </div>
                <button
                  disabled={loading || name.trim() === ""}
                  onClick={() => createSubmission()}
                  className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
