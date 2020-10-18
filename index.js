const inquirer = require('inquirer');

const promptMenu = () => {
    return inquirer.prompt([
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
               "Update an Employee Role"
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
        };
    });
};

promptMenu();