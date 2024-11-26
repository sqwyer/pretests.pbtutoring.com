import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Question } from "~/components/Question";
import { QuestionSelector } from "~/components/QuestionSelector";
import { PageLayout } from "~/pages";
import { api } from "~/utils/api";

function Review({ id }: { id: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { data: submission, status: submissionStatus } =
    api.submission.get.useQuery({ id });

  return (
    <div className="bg-blue-700">
      <section className="flex flex-col gap-4 bg-blue-700 p-4">
        {/* header */}
        <div className="flex flex-row items-center justify-center">
          <Link
            href={`/submissions/${id}`}
            className="flex flex-row items-center gap-1 rounded-md px-2 py-0.5 text-sm font-medium text-white duration-75 hover:bg-blue-600"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <p className="pr-2">Submission Review</p>
          </Link>
        </div>
        {submission ? (
          <QuestionSelector
            currentQuestion={currentQuestion}
            onChangeQuestion={(question) => setCurrentQuestion(question)}
            questions={submission.answers.length}
            showSubmit={false}
          />
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <section className="w-full rounded-t-lg bg-white px-4 py-8">
        {/* content */}

        {submissionStatus === "success" && (
          <>
            {submission!.answers[currentQuestion] ? (
              <Question
                answer={
                  (submission?.answers[currentQuestion]?.choice ?? null) as
                    | 0
                    | 1
                    | 2
                    | 3
                    | 4
                    | null
                }
                question={submission!.answers[currentQuestion]}
                previousDisabled={currentQuestion === 0}
                nextDisabled={
                  currentQuestion === (submission?.answers.length ?? 0) - 1
                }
                onChangeQuestion={(direction) =>
                  setCurrentQuestion((prev) =>
                    prev + direction < 0 ? 0 : prev + direction,
                  )
                }
                showCorrectAnswer={true}
              />
            ) : (
              <p className="text-sm text-gray-600">Error loading question...</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function ReviewSubmission() {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  return <PageLayout>{id ? <Review id={id} /> : <p>Loading...</p>}</PageLayout>;
}
