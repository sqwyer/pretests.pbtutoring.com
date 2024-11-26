import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function QuestionSelector({
  questions,
  currentQuestion,
  showSubmit,
  onChangeQuestion,
}: {
  questions: number;
  currentQuestion: number;
  showSubmit: boolean;
  onChangeQuestion: (question: number) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-3 sm:hidden">
        <button
          className="mr-auto flex flex-row items-center rounded-md border border-blue-400 px-2 py-1 text-sm text-blue-200 duration-75 hover:bg-blue-600 disabled:cursor-not-allowed disabled:border-transparent disabled:opacity-50 disabled:hover:bg-blue-700"
          disabled={currentQuestion <= 0}
          onClick={() =>
            currentQuestion > 0 && onChangeQuestion(currentQuestion - 1)
          }
        >
          <ChevronLeft className="h-4 w-4" />
          <p className="pr-2">Previous</p>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-white px-4 py-1 text-sm font-medium text-blue-600">
            <p>
              {currentQuestion < questions
                ? `Question ${currentQuestion + 1}`
                : "Submit"}
            </p>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-[200px] flex-col gap-2 p-2 sm:hidden">
            <div className="grid grid-cols-5 gap-2">
              {Array.from(Array(questions).keys()).map((questionIndex) => (
                <button
                  className={`flex h-8 w-8 items-center justify-center border border-blue-600 ${currentQuestion === questionIndex ? "bg-blue-600 text-white" : "bg-transparent text-blue-600 duration-75 hover:bg-blue-100"}`}
                  onClick={() => onChangeQuestion(questionIndex)}
                  key={"goto_q_1_" + questionIndex}
                >
                  <p>{questionIndex + 1}</p>
                </button>
              ))}
            </div>
            {showSubmit && (
              <div
                className="flex flex-col gap-2"
                onClick={() => onChangeQuestion(questions)}
              >
                <button className="w-full rounded-sm bg-blue-600 px-2 py-1 text-sm text-white duration-75 hover:bg-blue-700">
                  Submit
                </button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className="ml-auto flex flex-row items-center gap-1 rounded-md border border-blue-400 px-2 py-1 text-sm text-blue-200 duration-75 hover:bg-blue-600 disabled:cursor-not-allowed disabled:border-transparent disabled:opacity-50 disabled:hover:bg-blue-700"
          disabled={
            currentQuestion >= questions ||
            (!showSubmit && currentQuestion === questions - 1)
          }
          onClick={() =>
            currentQuestion < questions && onChangeQuestion(currentQuestion + 1)
          }
        >
          <p className="pl-2">
            {showSubmit && currentQuestion === questions - 1
              ? "Submit"
              : "Next"}
          </p>
          {/* {currentQuestion === questions - 1 ? (
          <p className="pl-2">Submit</p>
        ) : (
          <p className="pl-2">Next</p>
        )} */}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="hidden flex-row items-center justify-center gap-8 sm:flex">
        <div className="flex flex-row items-center gap-2">
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-sm font-medium text-blue-200 ${currentQuestion !== 0 ? "cursor-pointer duration-75 hover:bg-blue-600" : "cursor-default opacity-50"}`}
            onClick={() =>
              currentQuestion > 0 && onChangeQuestion(currentQuestion - 1)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from(Array(questions).keys()).map((questionIndex) => (
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium ${questionIndex === currentQuestion ? "border-white bg-white text-blue-700" : "border-transparent bg-transparent text-blue-200 duration-75 hover:bg-blue-600"}`}
              onClick={() => onChangeQuestion(questionIndex)}
              key={"goto_q_2_" + questionIndex}
            >
              {questionIndex + 1}
            </button>
          ))}
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-sm font-medium text-blue-200 ${currentQuestion < questions ? "cursor-pointer duration-75 hover:bg-blue-600" : "cursor-default opacity-50"} disabled:cursor-default disabled:opacity-50 disabled:hover:bg-blue-700`}
            disabled={!showSubmit && currentQuestion === questions - 1}
            onClick={() =>
              currentQuestion < questions &&
              onChangeQuestion(currentQuestion + 1)
            }
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
        {showSubmit && (
          <button
            className={`flex h-8 items-center justify-center rounded-md border px-4 text-sm font-medium ${currentQuestion >= questions ? "border-white bg-white text-blue-700" : "border-blue-400 bg-transparent text-blue-200 duration-75 hover:bg-blue-600"}`}
            onClick={() => onChangeQuestion(questions)}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
}
