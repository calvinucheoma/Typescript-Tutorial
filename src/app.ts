// Code goes here!
// const names: Array<string | number> = [];
// const names: Array<any> = [];
const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Job is finished!');
  }, 2000);
});

promise.then((data) => {
  console.log(data.toUpperCase());
});

//GENERIC FUNCTIONS

//This code below didn't run due to TypeScript's type inference limitations with Object.assign().

//A possible solution is to explicitly define the type of the merged object, by creating a new object
//and spreading the properties from both input objects as shown in the other code below.

// function merge<T, U>(objA: T, objB: U){
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({ name: 'Max' }, { age: 14 });
// console.log(mergedObj.name);

function merge<T, U>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const mergedObj = merge({ name: 'Max' }, { age: 14 });
console.log(mergedObj.name);

// WORKING WITH CONSTRAINTS
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj2 = merge({ name: 'Max' }, { age: 14 });
console.log(mergedObj2);

interface Lengthy {
  length: number;
}

//arrays,strings are all treated as objects behind the scenes that have a length property so we can use it here

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements';
  }
  return [element, descriptionText];
}

const printFunction = countAndDescribe('Hey there');
const printFunction2 = countAndDescribe([]);
const printFunction3 = countAndDescribe(['123', '345']);
console.log(printFunction);
console.log(printFunction2);
console.log(printFunction3);

// keyof CONSTRAINT
function extractKeyValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

console.log(extractKeyValue({ name: 'Dave' }, 'name'));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Dexter');
textStorage.addItem('Adele');
textStorage.addItem('Smithy');

console.log(textStorage.getItems());

textStorage.removeItem('Adele');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(5);
numberStorage.addItem(7);

numberStorage.removeItem(5);

console.log(numberStorage.getItems());

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({ name: 'Dex' });
// objectStorage.addItem({ name: 'Sadie' });
// objectStorage.addItem({ name: 'Amaka' });

// objectStorage.removeItem({ name: 'Dex' });
// objectStorage.removeItem({ name: 'Sadie' });

// console.log(objectStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// PARTIAL GENERIC UTILITY TYPE
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// READONLY GENERIC UTILITY TYPE
const namesList: Readonly<string[]> = ['Dave', 'Santan'];
//The Readonly type mainly guards against direct reassignment or modification of properties,
//but it doesn't extend to the methods that manipulate those properties.
//If you want to create an array that truly prevents modification, you would need to create a new type that
//wraps an array and provides only read-related methods, effectively implementing your own version of immutability.
names.push('Micah');
names.pop();
console.log(namesList);
