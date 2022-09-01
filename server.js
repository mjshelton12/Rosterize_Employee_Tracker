//Packages needed for this application
const inquirer = require("inquirer");
const { connection } = require("./db/queries");
require("console.table");
const tables = require("./db/queries");

const mainMenu = [
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

const roleQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the new role?",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the new role?",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "roleDept",
    message: "What is the ID of the department the new role belongs in?",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "emp_first_name",
    message: "What is the new employee's first name?",
  },
  {
    type: "input",
    name: "emp_last_name",
    message: "What is the new employee's last name?",
  },
  {
    type: "input",
    name: "emp_role",
    message: "What is the ID of the new employee's role?",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    name: "emp_manage",
    message: "What is the employee ID of the new employee's manager?",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
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
        break;
      case "Add a role":
        newRole();
        break;
      case "Add an employee":
        newEmployee();
        break;
      case "Update an employee role":
        updateEmployee();
        break;
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
  inquirer
    .prompt(deptQuestion)
    .then((data) => {
      tables
        .addDepartment(data)
        .then(console.log(data.newDept + " added to department list!"));
    })
    .then(() => beginProgram());
}

function newRole() {
  inquirer
    .prompt(roleQuestions)
    .then((data) => {
      tables
        .addRole(data)
        .then(console.log(data.roleName + " added to role list!"));
    })
    .then(() => beginProgram());
}

function newEmployee() {
  inquirer
    .prompt(employeeQuestions)
    .then((data) => {
      tables
        .addEmployee(data)
        .then(
          console.log(
            data.emp_first_name +
              " " +
              data.emp_last_name +
              " added to employee list!"
          )
        );
    })
    .then(() => beginProgram());
}

function updateEmployee() {
    tables
    .getEmployeeList()
    .then((data) => {
    inquirer
      .prompt([{
        name: "employeeToUpdate",
        type: "list",
        choices: function(){
            let employees = [];
            for(i=0; i<data.length; i++){
                employees.push(data[i].last_name)
                console.log(data[i])
            }
            return employees
        },
        message: "Choose employee to update"
    }])
      .then((data) => {
        tables
          .updateEmployee(data)
          .then(
            console.log(
                data
            //   data.emp_first_name +
            //     " " +
            //     data.emp_last_name +
            //     " updated in employee list!"
            )
          );
      })})
      beginProgram();
  }

beginProgram();
