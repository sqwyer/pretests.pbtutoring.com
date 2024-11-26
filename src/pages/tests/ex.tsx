import { type TestType, Test } from "~/components/Test";
import { PageLayout } from "..";

const ex: TestType = {
  name: "December ACT Pretest (11/26/24)",
  // questions: Array.from({length: 10}, () => ({
  //   questionContent: "$1+\\frac{1}{2}=?$",
  //   questionCategory: "ALGEBRA",
  //   a: "$\\frac{1}{2}$", // choice 0
  //   b: "$\\frac{2}{2}$", // choice 1
  //   c: "$\\frac{3}{2}$", // choice 2
  //   d: "$\\frac{4}{2}$", // choice 3
  //   e: "$\\frac{5}{2}$", // choice 4
  //   questionAnswer: 2
  // }))
  questions: [
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "ALGEBRA",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "FUNCTIONS",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "GEOMETRY",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "INTEGRATING_ESSENTIAL_SKILLS",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "NUMBERS_AND_QUANTITY",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "NUMBERS_AND_QUANTITY",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "STATISTICS_AND_PROBABILITY",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "STATISTICS_AND_PROBABILITY",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "FUNCTIONS",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "INTEGRATING_ESSENTIAL_SKILLS",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
    {
      questionContent: "$1+\\frac{1}{2}=?$",
      questionCategory: "INTEGRATING_ESSENTIAL_SKILLS",
      a: "$\\frac{1}{2}$", // choice 0
      b: "$\\frac{2}{2}$", // choice 1
      c: "$\\frac{3}{2}$", // choice 2
      d: "$\\frac{4}{2}$", // choice 3
      e: "$\\frac{5}{2}$", // choice 4
      questionAnswer: 2,
    },
  ],
};

export default function ExPretest() {
  return (
    <PageLayout>
      {/* <Test test={december24} /> */}
      <Test test={ex} />
    </PageLayout>
  );
}
