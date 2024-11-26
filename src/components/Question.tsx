import type { QuestionType } from "./Test";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function Question({
  question,
  answer,
  onChangeAnswer,
  onChangeQuestion,
  previousDisabled,
  nextDisabled,
  finalQuestion,
  showCorrectAnswer,
}: {
  question: QuestionType;
  answer: number | null;
  onChangeAnswer?: (answer: number | null) => void;
  onChangeQuestion?: (nextQuestion: number) => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  finalQuestion?: boolean;
  showCorrectAnswer?: boolean;
}) {
  const setChoice = (choice: number | null) => {
    if (onChangeAnswer) onChangeAnswer(choice);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs text-gray-600">(cg_{question.questionCategory})</p>
      <div className="mt-4 rounded-md border px-4 py-8 shadow-md sm:px-8">
        <div className="flex grid-cols-2 flex-col gap-2 sm:grid">
          <div className="border-b px-4 pb-8 sm:border-b-0 sm:border-r sm:pb-0">
            <p className="text-pretty font-serif">
              <Latex>{question.questionContent}</Latex>
            </p>
          </div>
          <div className="flex flex-col gap-2 px-4 pt-6 sm:pt-0">
            {["a", "b", "c", "d", "e"].map((choice, choiceIndex) => (
              <button
                className={cn(
                  `flex w-full flex-row gap-4 rounded-md border p-2 ${answer === choiceIndex ? "border-blue-700" : ""}`,
                  showCorrectAnswer && choiceIndex === question.questionAnswer
                    ? "border-green-500"
                    : "",
                  showCorrectAnswer &&
                    answer === choiceIndex &&
                    choiceIndex !== question.questionAnswer
                    ? "border-red-500"
                    : "",
                  showCorrectAnswer
                    ? "cursor-default"
                    : "cursor-pointer duration-75 hover:bg-gray-100",
                )}
                onClick={() =>
                  answer === choiceIndex
                    ? setChoice(null)
                    : setChoice(choiceIndex)
                }
                key={"ans_choice_" + choiceIndex}
              >
                <p
                  className={cn(
                    `flex h-6 w-6 items-center justify-center rounded-full border text-xs ${answer === choiceIndex ? "border-blue-700 bg-blue-700 text-white" : ""}`,
                    showCorrectAnswer && choiceIndex === question.questionAnswer
                      ? "border-green-500 bg-green-500 text-white"
                      : "",
                    showCorrectAnswer &&
                      answer === choiceIndex &&
                      choiceIndex !== question.questionAnswer
                      ? "border-red-500 bg-red-500 text-white"
                      : "",
                  )}
                >
                  {choice}
                </p>
                <p className="font-serif">
                  <Latex>
                    {question[choice as "a" | "b" | "c" | "d" | "e"]}
                  </Latex>
                </p>
              </button>
            ))}
          </div>
        </div>
        <div className="hidden grid-cols-2 gap-4 p-4 sm:grid">
          <button
            className="flex items-center justify-center rounded-sm bg-blue-700 p-2 text-center text-sm text-white duration-75 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-700"
            onClick={() =>
              previousDisabled !== true &&
              onChangeQuestion &&
              onChangeQuestion(-1)
            }
            disabled={previousDisabled}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <p>Previous question</p>
          </button>
          <button
            className="flex items-center justify-center rounded-sm bg-blue-700 p-2 text-center text-sm text-white duration-75 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-700"
            disabled={nextDisabled}
            onClick={() => onChangeQuestion && onChangeQuestion(1)}
          >
            <p>Next question</p>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-4 border-t bg-white p-4 sm:hidden">
        <button
          className="flex items-center justify-center gap-2 rounded-sm bg-blue-700 p-4 text-center text-xs text-white duration-75 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-700 sm:text-sm"
          onClick={() =>
            previousDisabled !== true &&
            onChangeQuestion &&
            onChangeQuestion(-1)
          }
          disabled={previousDisabled}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <p>Previous question</p>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-sm bg-blue-700 p-4 text-center text-xs text-white duration-75 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-700 sm:text-sm"
          onClick={() => onChangeQuestion && onChangeQuestion(1)}
          disabled={nextDisabled}
        >
          {finalQuestion ? <p>Submit</p> : <p>Next question</p>}
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
