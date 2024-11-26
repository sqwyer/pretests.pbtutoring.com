import { type TestType, Test } from "~/components/Test";
import { PageLayout } from "..";

const december24: TestType = {
  name: "December ACT Pretest (11/26/24)",
  questions: [
    {
      questionContent:
        "The square root of a certain number is approximately $9.2371$. The certain number is between what 2 integers?",
      questionCategory: "NUMBERS_AND_QUANTITY",
      a: "$3$ and $4$",
      b: "$4$ and $5$",
      c: "$9$ and $10$",
      d: "$18$ and $19$",
      e: "$81$ and $99$",
      questionAnswer: 4,
    },
    {
      questionContent:
        "Louis earns his regular pay of $\\$10.00$ per hour for up to 40 hours of work in a week. For each hour over 40 hours of work in a week, Louis is payed $1\\frac{1}{2}$ times his regular pay. How much does Louis earn for a week in which he works 47 hours?",
      questionCategory: "NUMBERS_AND_QUANTITY",
      a: "$\\$470.00$",
      b: "$\\$493.50$",
      c: "$\\$505.00$",
      d: "$\\$540.50$",
      e: "$\\$705.00$",
      questionAnswer: 2,
    },
    {
      questionContent:
        "The 35-member History Club is meeting to choose a student government representative. The members decide that the representative, who will be chosen at random, CANNOT be any of the 3 officers of the club. What is the probability that Hiroko, who is a member of the club but NOT an officer, will be chosen?",
      questionCategory: "STATISTICS_AND_PROBABILITY",
      a: "$0$",
      b: "$\\frac{4}{35}$",
      c: "$\\frac{1}{35}$",
      d: "$\\frac{1}{3}$",
      e: "$\\frac{1}{32}$",
      questionAnswer: 4,
    },
    {
      questionContent:
        "There are 25 buildings on Elm Street. Of these 25 buildings, 10 have fewer than 6 rooms, 10 have more than 7 rooms, and 4 have more than 8 rooms. What is the total number of buildings on Elm Street that have 6, 7, or 8 rooms.",
      questionCategory: "STATISTICS_AND_PROBABILITY",
      a: "5",
      b: "9",
      c: "11",
      d: "14",
      e: "15",
      questionAnswer: 2,
    },
    {
      questionContent:
        "You tossed a fair coin 10 times, recording H when the head side landed up and T when the tail side landed up. You recorded: T H H H H T H H H H. What is the probability that the head side will land up on your next toss?",
      questionCategory: "STATISTICS_AND_PROBABILITY",
      a: "$0$",
      b: "$(\\frac{1}{2})^11$",
      c: "$(\\frac{1}{2})^9$",
      d: "$\\frac{1}{2}$",
      e: "$1$",
      questionAnswer: 3,
    },
    {
      questionContent:
        "For all positive values of $a$ and $b$, which of the following expressions is equal to $\\frac{2a}{b}+\\frac{b}{2a}$ ?",
      questionCategory: "ALGEBRA",
      a: "$\\frac{2a+b}{b+2a}$",
      b: "$\\frac{2a+b}{2ab}$",
      c: "$\\frac{4a+b}{2ab}$",
      d: "$\\frac{4a^2+b^2}{2ab}$",
      e: "$\\frac{4a^2+b^2}{2a+b}$",
      questionAnswer: 3,
    },
    {
      questionContent:
        "For all nonzero values of x and y, which of the following expressions is equivalent to $-\\frac{28x^4y^3}{4xy}$",
      questionCategory: "ALGEBRA",
      a: "$-7x^3y^2$",
      b: "$-7x^4y^4$",
      c: "$-7x^5y^4$",
      d: "$-24x^3y^2$",
      e: "$-32x^3y^2$",
      questionAnswer: 0,
    },
    {
      questionContent:
        "What is the greatest integer solution to $6x-2\\leq 11.2$ ?",
      questionCategory: "ALGEBRA",
      a: "$-2$",
      b: "$-1$",
      c: "$1$",
      d: "$2$",
      e: "$3$",
      questionAnswer: 3,
    },
    {
      questionContent:
        "In the standard $(x,y)$ coordinate plane, what is the slope of the line through $(-7,3)$ and $(2,4)$ ?",
      questionCategory: "FUNCTIONS",
      a: "$-\\frac{7}{5}$",
      b: "$-\\frac{1}{5}$",
      c: "$-\\frac{1}{9}$",
      d: "$\\frac{1}{9}$",
      e: "$\\frac{1}{5}$",
      questionAnswer: 3,
    },
    {
      questionContent:
        "If $f(x)=5x^2-6x+1$ and $g(x)=x^2-2$, which of the following equations represents $(fg)(x)$ ?",
      questionCategory: "FUNCTIONS",
      a: "$6x^2-6x-1$",
      b: "$5x^4-26x^2+33$",
      c: "$5x^4-20x^2-6x+21$",
      d: "$5x^4-6x^3-9x^2+12x-2$",
      e: "$25x^4-60x^3+46x^2-12x-1$",
      questionAnswer: 3,
    },
    {
      questionContent:
        "What are the only and all values of x that are NOT in the domain of the function $f(x)=\\frac{(x-7)(x+2)}{(x+6)(x-8)}$",
      questionCategory: "FUNCTIONS",
      a: "$-8$ and $6$",
      b: "$-6$ and $8$",
      c: "$-2$ and $7$",
      d: "$-8, -7, -2$ and $6$",
      e: "$-6, -2, 7$ and $8$",
      questionAnswer: 1,
    },
    {
      questionContent:
        'In the figure shown below, $ABCD$ is a rectangle, $EFGH$ is a square, and $\\overline{CD}$ is the diameter of a semicircle. Point $K$ is the midpoint of $\\overline{CD}$. Point $J$ is the midpoint of both $\\overline{AB}$ and $\\overline{EF}$. Points $E$ and $F$ lie on $\\overline{AB}$. The 3 given lengths are in meters. <img src="https://i.ibb.co/YQZRSPg/Screenshot-2024-11-26-133936.png" />',
      questionCategory: "GEOMETRY",
      a: "$2.5\\pi$",
      b: "$5\\pi$",
      c: "$6.25\\pi$",
      d: "$10\\pi$",
      e: "$25\\pi$",
      questionAnswer: 1,
    },
    {
      questionContent:
        'Point A lies at $(2,5)$ and point $B$ lies at $(-5,10)$ in the standard $(x,y)$ coordinate plane below. What is the length, in coordinate units, of $\\overline{AB}$? <img src="https://i.ibb.co/FK6mr3L/Screenshot-2024-11-26-134236.png" />',
      questionCategory: "GEOMETRY",
      a: "$\\sqrt{40}$",
      b: "$\\sqrt{65}$",
      c: "$\\sqrt{125}$",
      d: "$13$",
      e: "$17$",
      questionAnswer: 1,
    },
    {
      questionContent:
        'In the figure below, a sector is shown shaded in a circle with radius 4 decimeters. The length of the arc of the unshaded sector is $7\\pi$ decimeters. What is the measure of the central angle of the shaded sector? <img src="https://i.ibb.co/WFjzn19/Screenshot-2024-11-26-134619.png" />',
      questionCategory: "GEOMETRY",
      a: "$35\\degree$",
      b: "$40\\degree$",
      c: "$45\\degree$",
      d: "$50\\degree$",
      e: "$55\\degree$",
      questionAnswer: 2,
    },
    {
      questionContent:
        "Each side of square ABCD has a length of 50 cm. A certain rectangle whose area is equal to the area of ABCD has a width of 10cm. What is the length, in centimeters, of the rectangle?",
      questionCategory: "INTEGRATING_ESSENTIAL_SKILLS",
      a: "40",
      b: "50",
      c: "60",
      d: "125",
      e: "250",
      questionAnswer: 4,
    },
    {
      questionContent:
        "Let a and b represent real numbers with the property $|a-b-1|>0$. Which of the following statements about a and b CANNOT be true?",
      questionCategory: "INTEGRATING_ESSENTIAL_SKILLS",
      a: "$a-b<1$",
      b: "$a-b=1$",
      c: "$a<1$ and $b>0$",
      d: "$a<1$ and $b=0$",
      e: "$a<0$ and $b>0$",
      questionAnswer: 1,
    },
  ],
};

export default function December24Pretest() {
  return (
    <PageLayout>
      {/* <Test test={december24} /> */}
      <Test test={december24} />
    </PageLayout>
  );
}
