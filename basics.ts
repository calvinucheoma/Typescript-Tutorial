function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return num1 + num2;
  }
}

const value1 = 10;
const value2 = 2.5;
const printResult = true;
const resultPhrase = 'The result is ';

add(value1, value2, printResult, resultPhrase);
