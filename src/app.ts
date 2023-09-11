// function Logger(logString: string) {
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// @Logger('Hello Jo!')
// class Person {
//   name = 'Dave';

//   constructor() {
//     console.log('Creating a new person...');
//   }
// }

// const person1 = new Person();
// console.log(person1);

// BUILDING DECORATORS

// function WithTemplate(template: string, hookId: string) {
//   return function (_: Function) {
//     const hookElement = document.getElementById(hookId);
//     if (hookElement) {
//       hookElement.innerHTML = template;
//       hookElement.querySelector('h1')!.textContent = p.name;
//     }
//   };
// }

// @WithTemplate('<h1>My name is Chukwuma!</h1>', 'app')
// class Person {}

// RETURNING A NEW CLASS IN A DECORATOR

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');

  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super(); //to call the original constructor function from inside of it
        console.log('Rendering template...');
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          hookElement.innerHTML = template;
          hookElement.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@Logger('Hello')
@WithTemplate('<h1>My name is Chukwuma!</h1>', 'app')
class Person {
  name = 'Dave';

  constructor() {
    console.log('Creating a new person...');
  }
}

const person1 = new Person();
console.log(person1);

// ACCESSOR, PROPERTY, PARAMETER AND METHOD DECORATORS

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return (this._price = this._price * (1 + tax));
  }
}

const product1 = new Product('Book', 19);
const product2 = new Product('Comic', 24);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  console.log(originalMethod);
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjustedDescriptor; //typescript replaces the old methods descriptor with this one. It overrides the old one
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

// VALIDATION WITH DECORATORS

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: ['required'],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: ['positive'],
  };
}

function validate(obj: any) {
  const objectValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objectValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objectValidatorConfig) {
    // console.log(prop);
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value; //add plus sign to convert it to a number

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please enter a valid input');
    return;
  }
  console.log(createdCourse);
});
