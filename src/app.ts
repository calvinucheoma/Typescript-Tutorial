// Code goes here!
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
  name: 'Chuks',
  privileges: ['Free wifi', 'Access to server'],
  startDate: new Date(),
};

// console.log(el);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//FUNCTION OVERLOAD
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Dave ', 'Max');
result.toUpperCase();
console.log(result);

type UnknownEmployee = Admin | Employee;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log('Name ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start date is: ' + emp.startDate);
  }
}

printEmployeeInfo(el);

class Car {
  drive() {
    console.log('Driving a car...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck..');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ('loadCargo' in vehicle) { //one way of doing this
  //     vehicle.loadCargo(1000);
  //   }
  if (vehicle instanceof Truck) {
    //
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving with speed of: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 25 });

const paragraph = document.getElementById('message');

//METHOD 1
// const userInputElement = <HTMLInputElement>(
//   document.getElementById('user-input')!
// );

//METHOD 2
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;

userInputElement.value = 'Hi There';

// if (userInputElement) {
//     (userInputElement as HTMLInputElement).value = 'Yello there'
// }

interface ErrorContainer {
  // id:string; //has to be a string since our index type is a string
  //   [prop: number]: string; // makes sure all the property names are numbers
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Invalid email',
  username: 'Invalid username',
};

console.log(errorBag);
