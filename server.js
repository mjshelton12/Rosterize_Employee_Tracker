//Packages needed for this application
const inquirer = require("inquirer");
require("console.table");
const tables = require("./db/queries");

const mainMenu = [
  // WHEN I start the application
  // THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

  {
    type: "list",
    name: "mainMenu",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];

const deptQuestion = [
  {
    type: "input",
    name: "newDept",
    message: "What is the name of the new department?",
  },
];

function beginProgram() {
  inquirer.prompt(mainMenu).then((data) => {
    switch (data.mainMenu) {
      case "View all departments":
        viewAllDepartments();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        newDepartment();
      default:
        process.exit();
        break;
    }
  });
}

function viewAllDepartments() {
  tables
    .findDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => beginProgram());
}

function viewAllRoles() {
  tables
    .findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => beginProgram());
}

function viewAllEmployees() {
  tables
    .findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => beginProgram());
}

function newDepartment() {
    inquirer.prompt(deptQuestion).then((data) => {
        addDepartment(data)
    });
  }

function addDepartment(data) {
    console.log(data.newDept)
}

beginProgram();
