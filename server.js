const mysql = require('mysql2');
const inquirer = require("inquirer");
const { connect } = require('http2');

// create the initial connection to the SQL server
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'pwXtd5eQZEBwM4Qk',
    database: 'employees'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    mainMenu();
  });

  // Main Navigational Menu
  function mainMenu() {
    inquirer.prompt([ //Prompt the user
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
               "View Departments",
               "View Roles",
               "View Employees",
               "Add a Department",
               "Add a Role", 
               "Add an Employee",
               "Update an Employee Role",
               "Exit"
            ]
        }
    ])
    .then(menuChoice => {
        switch(menuChoice.menu) { //choose a selection based on user choice
            case 'View Departments':
                displayDepartments();
                break;
            case 'View Roles':
                displayRoles();
                break;
            case 'View Employees':
                displayEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
                break;
            case "Exit":
                connection.end();
                break;
            default: 
                mainMenu();
        };
    });
};

// Displays all departments in database
function displayDepartments() { 
    const sql = `SELECT id, dept_name FROM department`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

// Displays all roles in database
function displayRoles() {
    const sql = `SELECT emp_role.title AS Title, 
                emp_role.id AS "Title ID", 
                department.dept_name As Department, 
                emp_role.salary AS Salary 
                FROM emp_role 
                LEFT JOIN department ON emp_role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

// Displays all Employees in database
function displayEmployees() {
    const sql = `SELECT employee.id AS "Employee ID", 
                employee.first_name AS "First Name", 
                employee.last_name AS "Last Name", 
                emp_role.title AS "Title", 
                department.dept_name AS "Department", 
                emp_role.salary AS "Salary" 
                FROM employee
                LEFT JOIN emp_role
                ON employee.emp_role_id = emp_role.id
                LEFT JOIN department
                ON emp_role.department_id = department.id`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

// Function to add a Department to the database
function addDepartment() {
    inquirer.prompt([
        {
            name: "dept_name",
            message: 'What department would you like to add?',
            type: "input"
        }
    ])
    .then(({dept_name}) => {
        const sql = `INSERT INTO department (dept_name)
                    VALUES (?)`;
        const params = [dept_name];
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Department ${dept_name} added!`);
            displayDepartments();
        })
    })
};

// Function to add a Role to the database
function addRole() {
    inquirer.prompt([
        {
            name: "title",
            message: 'What role would you like to add?',
            type: 'input'
        },
        {
            name: "salary",
            message: "What Salary does this role have?",
            type: 'input'
        },
        {
            name: "department_id",
            message: "What is the ID for the department this role belongs to?",
            type: 'input'
        }
    ])
    .then(({title, salary, department_id}) => {
        const sql = `INSERT INTO emp_role (title, salary, department_id)
                    VALUES (?, ?, ?)`;
        const params = [title, salary, department_id];
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Role ${title} added!`);
            displayRoles();
        })
    })
};

// Function to add an Employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?",
            type: 'input'
        },
        {
            name: "last_name",
            message: "What is the employee's last name?",
            type: 'input'
        },
        {
            name: "role",
            message: "What is the employee's role? (Enter the role ID number)",
            type: 'input'
        },
        {
            name: "manager",
            message: "Who is the employee's manager? (Enter the managers ID number)",
            type: "input"
        }
    ])
    .then(({first_name, last_name, role, manager}) => {
        const sql = `INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
        const params = [first_name, last_name, role, manager];
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Employee ${first_name} ${last_name} was added!`);
            displayEmployees();
        })
    })
};

// Function to update an Employee's Role in the database
function updateEmployee() {
    inquirer.prompt([
        {
            name: "employee_id",
            message: "Please enter the ID of the employee that will be updated",
            type: 'input'
        },
        {
            name: "emp_role",
            message: "What is the employee's new role? (Enter the Role ID)",
            type: "input"
        }
    ])
    .then(({employee_id, emp_role}) => {
        const sql = `UPDATE employee SET emp_role_id = ?
                    WHERE id = ?`;
        const params = [emp_role, employee_id];
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Employee was updated!`);
            displayEmployees();
        })
    })
};