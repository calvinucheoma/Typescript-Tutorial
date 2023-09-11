interface Person {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
}

class User implements Person {
  name: string;
  age: number;
  sex = 'male'; //we can add extra properties to it

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string) {
    console.log(
      phrase +
        ' ' +
        this.name +
        ' ' +
        'and I am' +
        ' ' +
        this.age +
        ' ' +
        'years old'
    );
  }
}

let user1: Person;

user1 = {
  name: 'Chuks',
  age: 23,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user1.greet('Hi, my name is');

let user2: Person;

user2 = new User('Jeff', 28);
console.log(user2);
user2.greet('Hi, my name is');
// user2.name='Max' This does not work because we cannot assign to 'name' because it is a read-only property.

interface Username {
  readonly username: string;
  outputName?: string;
}

interface Greeting extends Username {
  greetUser(phrase: string): void;
}

class ActiveUser implements Greeting {
  username: string;
  outputName?: string;
  age = 21;
  sex = 'female';

  constructor(n: string, on?: string) {
    this.username = n;
    if (on) {
      this.outputName = on;
    }
  }

  greetUser(phrase: string) {
    console.log(
      phrase + this.username + ' and I am ' + this.age + ' years old.'
    );
  }
}

let user3: Greeting;

user3 = new ActiveUser('Jane');
user3.greetUser('Hello, my name is ');

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

console.log(add(12, 34));
