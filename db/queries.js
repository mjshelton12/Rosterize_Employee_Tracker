const connection = require("./connection");

class Methods {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    return this.connection.promise().query("SELECT * FROM department;");
  }

  findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.title, role.id, department.department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
      );
  }

  findEmployees() {
    return this.connection
      .promise()
      .query(
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, concat(manager.first_name, " ", manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee as manager on employee.manager_id = manager.id'
      );
  }

  addDepartment(data) {
    return this.connection
      .promise()
      .query(`INSERT INTO department (department) VALUE ("${data.newDept}");`);
  }

  addRole(data) {
    return this.connection
      .promise()
      .query(`INSERT INTO role (title, salary, department_id) VALUE ("${data.roleName}", ${data.roleSalary}, ${data.roleDept});`);
  }

  addEmployee(data) {
    return this.connection
      .promise()
      .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${data.emp_first_name}", "${data.emp_last_name}", ${data.emp_role}, ${data.emp_manage});`);
  }

//   getEmployeeList(){
//     return this.connection.promise().query("SELECT last_name FROM employee;")
//   }

getEmployeeList() {
    const employeeResults = this.connection
      .promise()
      .query("SELECT last_name FROM employee;");
    console.log(employeeResults);
    return employeeResults;
  }

  updateEmployeeRole(){
    return "Temp data"
  }

}

module.exports = new Methods(connection);
