const connection = require("./connection");

class Methods {
  constructor(connection) {
    this.connection = connection;
  }

  findDepartments() {
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
    return this.connection.promise().query("SELECT * FROM department;");
  }

  findRoles() {
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    return this.connection.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;');
  }

  findEmployees() {
    //   WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    return this.connection.promise().query();
  }
}

module.exports = new Methods(connection);
