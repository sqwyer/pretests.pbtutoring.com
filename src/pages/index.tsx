import { ArrowRight } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { type ReactNode } from "react";
import Image from "next/image";

export function PageLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Head>
        <title>ACT Pretests | pbtutoring.com</title>
        <meta
          name="description"
          content="Pretests for PBTutoring's math workshops."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={className ?? undefined}>{children}</main>
    </>
  );
}

export default function Home() {
  return (
    <PageLayout className="flex min-h-screen justify-center p-8 sm:items-center">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="rounded-sm border shadow-sm">
          <p className="rounded-t-sm border-b bg-gray-100 p-2 text-xs">
            ACT Pretests | pbtutoring.com
          </p>
          <div>
            {/* tests list */}
            <Link
              href="/tests/december24"
              className="flex items-center p-2 hover:text-blue-600 hover:underline"
            >
              <p className="font-medium">December ACT Pretest (11/26/24)</p>
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-auto flex flex-row items-center gap-2 border-t pt-4 sm:mt-0">
          <Image
            src={"/pbt-shield.svg"}
            height={32}
            width={32}
            alt="PBT Logo"
          />
          <p className="text-sm font-medium text-red-600">
            Pulliam-Bivens Tutoring
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
