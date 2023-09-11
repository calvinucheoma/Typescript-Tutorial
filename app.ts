type Combinable = number | string;
type UltraCombinable = number | string | boolean;
type User = { name: string; age: number };

// function combine(input1: UltraCombinable, input2: Combinable) {
//   let result: any;
//   if (typeof input1 === 'number' && typeof input2 === 'number') {
//     result = input1 + input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }

//   return result;
// }

// function userProfile(user: User) {
//   alert('Hi, My name is ' + user.name + ' and I am ' + user.age + ' years old');
// }

// function printResult1(num: number): void {
//   console.log('The result is: ' + num);
// }

// printResult1(5);

// function printResult2(num: number): number {
//   return num;
// }

// console.log(printResult2(7));

// function printResult3(num: number): undefined {
//   console.log('The result is: ' + num);
// }

// function add(num1: number, num2: number) {
//   return num1 + num2;
// }

// // let addResult:Function;

// let addResult: (n1: number, n2: number) => number;

// addResult = add;

// console.log(addResult(21, 9));

// const addResult = combine(50, 25);
// alert(addResult);

// userProfile()

// function addHandler(num1: number, num2: number, cb: (num: number) => void) {
//   const result = num1 + num2;
//   cb(result);
// }

// addHandler(20, 20, (result) => console.log(result));

// let user: unknown;
// let username: string;

// user = 'Dave';
// if (typeof user === 'string') {
//   username = user;
// }

function errorHandler(message: string, code: number): never {
  throw { errorMessage: message, errorCode: code };
}

const errorResult = errorHandler('Bad Requesties', 404);
console.log(errorResult);
errorHandler('Bad Requesties', 404);
