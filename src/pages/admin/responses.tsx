import { api } from "~/utils/api";
import { PageLayout } from "..";
import { RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "~/components/ui/loading-spinner";
import Link from "next/link";

export default function Submissions() {
  const {
    data: responses,
    status: responsesStatus,
    refetch,
  } = api.submission.list.useQuery();

  const [reloading, setReloading] = useState(true);

  useEffect(() => {
    if (responsesStatus === "pending") setReloading(true);
    else setReloading(false);
  }, [responsesStatus, setReloading]);

  const reload = () => {
    setReloading(true);
    refetch()
      .then(() => setReloading(false))
      .catch((err) => {
        console.error(err);
        setReloading(false);
      });
  };

  return (
    <>
      <PageLayout className="flex flex-col items-center justify-center gap-8">
        <div className="w-full bg-red-700 px-4 py-2 text-white">
          <p className="text-center text-sm font-medium text-white">
            Pretest Admin Page
          </p>
        </div>
        <div className="mx-auto w-full max-w-2xl rounded-md border">
          <div className="flex flex-row items-center border-b p-2">
            <h1 className="text-2xl font-medium">All Responses</h1>
            <button
              className="ml-auto cursor-pointer rounded-md bg-blue-700 p-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-700"
              onClick={() => reload()}
              disabled={reloading}
            >
              <RotateCcwIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col">
            {(responsesStatus === "pending" || reloading) && (
              <LoadingSpinner className="mx-auto my-2" />
            )}
            {responsesStatus === "error" && (
              <p className="m-2 text-sm text-gray-600">An error occured...</p>
            )}
            {responsesStatus === "success" &&
              !reloading &&
              responses.map((response) => (
                <Link
                  href={`/submissions/${response.id}`}
                  target="_blank"
                  className="cursor-pointer p-2 hover:bg-gray-100 [&:not(:last-child)]:border-b"
                  key={response.id}
                >
                  <p className="text-lg font-medium text-black">
                    {response.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Submitted at{" "}
                    {response.createdAt.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    on{" "}
                    {response.createdAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
