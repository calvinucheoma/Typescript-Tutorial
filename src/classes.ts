// Code goes here!
abstract class Department {
  //   readonly name: string;
  //  private employees: string[] = [];
  protected employees: string[] = [];
  static fiscalYear: number = 2020;

  //   constructor(n: string) {
  //     this.name = n;
  //   }

  static createEmployee(name: string) {
    return { name: name };
  }

  constructor(protected id: number, public name: string) {
    console.log(Department.fiscalYear);
  }
  //this is a shorthand for initializing our properties without having to do so above but we can do everything inside
  // the constructor function. We however do need to specify the public and private keyword for each of the properties
  // and also give them names corresponding to the property names we want to be created

  // describe(this: Department) {
  //   // we define a method in a class like a function but without the function keyword
  //   // without including 'this' keyword as a parameter above and setting the type to be our Department class,
  //   // if we create a new object as we did below and assign the value of our function to a property key in the object,
  //   // we would get undefined in the console because 'this' keyword usually points to the parent calling it, which in
  //   // our case is the object created and since it does not have any name property, it returns undefined in the console.
  //   // 'this' keyword and setting it to our class name helps typescript to return an error if we try to assign the
  //   // function value to a new object that does not have a property corresponding to what the 'this' keyword is checking for.

  //   // this.name = 'Sandy' //We cannot do this because 'name' property is now a readonly property and as such
  //   // we define it once and cannot change it in our code again, just like how const works

  //   console.log('Department: ' + this.name + ' with ID of: ' + this.id);
  // }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department(4, 'Accounting'); //cannot create an instance of an abstract class
// console.log(accounting);
const employee1 = Department.createEmployee('Joe');
console.log(employee1);
// accounting.describe();
// accounting.addEmployee('Dave');
// accounting.addEmployee('Sandra');

// accounting.employees[2] = 'Steve';
//we do not want to be able to add an employee from here so we can turn it into a private property
//by adding the private keyword in front of it so it can only be accessible from inside the class

// accounting.printEmployeeInfo();

// const finance = {describe:accounting.describe};
// const finance = { name: 'Economist', describe: accounting.describe }; //property names have to corresponding to what we have in our class
// finance.describe();

class ITDepartment extends Department {
  admins: string[];

  constructor(id: number, adminNames: string[]) {
    super(id, 'IT DEPT');
    this.admins = adminNames;
  }

  addEmployee(employee: string) {
    if (employee === 'Dave') {
      return;
    }
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees);
  }

  describe() {
    console.log('This department is called ' + this.id);
  }
}

const itDept = new ITDepartment(2, ['Ada', 'Joel']);

itDept.addEmployee('Dave');
itDept.addEmployee('Sandra');
itDept.printEmployeeInfo();
itDept.describe();

// console.log(itDept);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value.');
    }
    this.addReports(value);
  }

  private constructor(id: number, private reports: string[]) {
    super(id, 'Accounts Dept');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      //or if (this.instance)
      return this.instance; //or return AccountingDepartment.instance
    }
    this.instance = new AccountingDepartment(10, [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
    ]);
    return this.instance;
  }

  describe() {
    console.log('Department of Accounting with id of' + this.id);
  }

  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }
}

// const accountDept = new AccountingDepartment(5, [
//   'JAN',
//   'FEB',
//   'MAR',
//   'APR',
//   'MAY',
// ]);
const accountDept = AccountingDepartment.getInstance();
// console.log(accountDept);
accountDept.mostRecentReport = 'DEC'; //SETTER
console.log(accountDept.mostRecentReport); //GETTER
accountDept.addReports('JUN');
accountDept.getReports();
accountDept.describe();
