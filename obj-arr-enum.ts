// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'Chuks',
//   age: 22,
//   hobbies: ['eating', 'gaming'],
//   role: [2, 'author'],
// };

// person.role.push('Daniel');
// person.role[1] = 2;
// person.role = [];
// person.role = [1, 'Dave', 4];
// person.role = [5, 'Chuks'];

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: 'Chuks',
  age: 22,
  hobbies: ['eating', 'gaming'],
  role: Role.ADMIN,
};

console.log(person);
for (const hobby of person.hobbies) {
  console.log(hobby);
}

if (person.role === Role.ADMIN) {
  console.log('is ADMIN');
}
