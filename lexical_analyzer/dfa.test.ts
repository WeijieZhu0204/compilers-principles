import dfa from "./dfa";

test("a >= 2", () => {
  expect(dfa("a >= 2")).toEqual([
    {
      type: "Identifier",
      value: "a"
    },
    {
      type: "GE",
      value: ">="
    },
    {
      type: "Number",
      value: "2"
    }
  ]);
});

test("abc_32aa > 230495", () => {
  expect(dfa("abc_32aa > 230495")).toEqual([
    {
      type: "Identifier",
      value: "abc_32aa"
    },
    {
      type: "GT",
      value: ">"
    },
    {
      type: "Number",
      value: "230495"
    }
  ]);
});

test("a+b*3/22-d", () => {
  expect(dfa("a+b*3/22-d")).toEqual([
    {
      type: "Identifier",
      value: "a"
    },
    {
      type: "Plus",
      value: "+"
    },
    {
      type: "Identifier",
      value: "b"
    },
    {
      type: "Multiply",
      value: "*"
    },
    {
      type: "Number",
      value: "3"
    },
    {
      type: "Divide",
      value: "/"
    },
    {
      type: "Number",
      value: "22"
    },
    {
      type: "Minus",
      value: "-"
    },
    {
      type: "Identifier",
      value: "d"
    }
  ]);
});
