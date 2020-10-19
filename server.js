const mysql = require('mysql2');
const inquirer = require("inquirer");

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
               "View All Departments",
               "View All Roles",
               "View All Employees",
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
            case 'View All Departments':
                console.log("You chose to 'View All Departments!'");
                break;
            case 'View All Roles':
                console.log("You chose to 'View All Employees'");
                break;
            case 'View All Employees':
                console.log("You chose to 'View All Employees'");
                break;
            case 'Add a Department':
                console.log("You chose to 'Add a Department'");
                break;
            case 'Add a Role':
                console.log("You chose to 'Add a Role'");
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