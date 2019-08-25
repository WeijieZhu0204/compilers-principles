/**
 * 有限自动机 DFA
 */

// token类型
enum TokenType {
  // 标识符
  Identifier = "Identifier",
  // 数字字面量
  Number = "Number",
  // >
  GT = "GT",
  // >=
  GE = "GE",
  // =
  EQ = "EQ",
  // +
  Plus = "Plus",
  // -
  Minus = "Minus",
  // *
  Multiply = "Multiply",
  // /
  Divide = "Divide"
}

// 有限自动机状态
enum DFAState {
  Initial = "Initial",
  Identifier = "Identifier",
  Number = "Number",
  GT = "GT",
  GE = "GE",
  EQ = "EQ",
  Plus = "Plus",
  Minus = "Minus",
  Multiply = "Multiply",
  Divide = "Divide"
}

interface Token {
  type: TokenType | string;
  value: string;
}

/**
 * 是否合法标识符字符
 * @param char
 */
function isIdentifier(char: string) {
  return /[a-zA-Z_]/.test(char);
}

/**
 * 是否合法数字
 * @param char
 */
function isDigit(char: string) {
  return /\d/.test(char);
}

/**
 * DFA词法分析程序入口
 * @param source 源代码
 */
function main(source: string) {
  let state: DFAState;
  const token: Token = { type: "", value: "" };
  const tokens: Token[] = [];
  /**
   * 状态机首字符判断
   * @param char
   */
  function initial(char: string) {
    saveToken();

    if (char === " ") {
      state = undefined;
      return;
    }

    token.value = char;
    if (isIdentifier(char)) {
      state = DFAState.Identifier;
      token.type = TokenType.Identifier;
    } else if (isDigit(char)) {
      state = DFAState.Number;
      token.type = TokenType.Number;
    } else if (char === ">") {
      state = DFAState.GT;
      token.type = TokenType.GT;
    } else if (char === "=") {
      state = DFAState.EQ;
      token.type = TokenType.EQ;
    } else if (char === "+") {
      state = DFAState.Plus;
      token.type = TokenType.Plus;
    } else if (char === "-") {
      state = DFAState.Minus;
      token.type = TokenType.Minus;
    } else if (char === "*") {
      state = DFAState.Multiply;
      token.type = TokenType.Multiply;
    } else if (char === "/") {
      state = DFAState.Divide;
      token.type = TokenType.Divide;
    } else {
      throw new Error(`Illegal Token: '${char}'`);
    }
  }

  /**
   * 保存上一个有效token
   */
  function saveToken() {
    if (state) {
      tokens.push({
        ...token
      });
    }
  }

  for (let char of source) {
    switch (state) {
      case undefined:
        initial(char);
        break;
      case DFAState.Identifier:
        if (isIdentifier(char) || isDigit(char)) {
          token.value += char;
        } else {
          initial(char);
        }
        break;
      case DFAState.Number:
        if (isDigit(char)) {
          token.value += char;
        } else {
          initial(char);
        }
        break;
      case DFAState.GT:
        if (char === "=") {
          token.value += char;
          token.type = TokenType.GE;
          state = DFAState.GE;
        } else {
          initial(char);
        }
        break;
      // 其余没有匹配自动机的字符，直接开始下一个初始化字符。
      default:
        initial(char);
    }
  }
  saveToken();

  return tokens;
}

// console.log(main("age >= 123"));
// console.log(main("  age    >=    123    "));
// console.log(main("age     >= 123   "));
// console.log(main("a113g_e > 0"));
console.log(main("0-1+22/33*5"));
