const mysql = require('mysql2');
const inquirer = require("inquirer");
const { connect } = require('http2');

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

  function mainMenu() {
    inquirer.prompt([
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
        switch(menuChoice.menu) {
            case 'View Departments':
                console.log("You chose to 'View All Departments!'");
                displayDepartments();
                break;
            case 'View Roles':
                console.log("You chose to 'View All Employees'");
                displayRoles();
                break;
            case 'View Employees':
                console.log("You chose to 'View All Employees'");
                displayEmployees();
                break;
            case 'Add a Department':
                console.log("You chose to 'Add a Department'");
                addDepartment();
                break;
            case 'Add a Role':
                console.log("You chose to 'Add a Role'");
                addRole();
                break;
            case 'Add an Employee':
                console.log("you chose to 'Add an Employee'");
                break;
            case 'Update an Employee Role':
                console.log("You chose to 'Update an Employee Role'");
                break;
            case "Exit":
                connection.end();
                break;
            default: 
                mainMenu();
        };
    });
};

function displayDepartments() {
    const sql = `SELECT id, dept_name FROM department ORDER BY dept_name`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

function displayRoles() {
    const sql = `SELECT emp_role.title AS Title, 
                emp_role.id AS "Title ID", 
                department.dept_name As Department, 
                emp_role.salary AS Salary 
                FROM emp_role 
                LEFT JOIN department ON emp_role.department_id = department.id
                ORDER BY department.dept_name`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

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
                ON emp_role.department_id = department.id
                ORDER BY employee.last_name`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

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
    .then(() => {
        mainMenu()
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "role_title",
            message: 'What role would you like to add?',
            type: 'input'
        },
        {
            name: "role_salary",
            message: "What Salary does this role have?",
            type: 'input'
        },
        {
            name: "role_department_id",
            message: "What is the ID for the department this role belongs to?",
            type: 'input'
        }
    ])
    .then(({role_title, role_salary, role_department_id}) => {
        const sql = `INSERT INTO emp_role (title, salary, department_id)
                    VALUES (?, ?, ?)`;
        const params = [role_title, role_salary, role_department_id];
        connection.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(`Role ${role_name} added!`);
            displayRoles();
        })
    })
    .then(() => {
        mainMenu()
    });
};