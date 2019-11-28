var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");
//var fs = require("fs");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
        //need to add conditionals to whatever choice is selected and add addtional questions
        //What is the employee's first name?
        //What is the employee's last name?
        //Which employee do you want to remove? - needs to bring up list of employees
        //What role would you like to update it to?
        //Who is the employee's manager?
       
    ]);
}

function generateHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });
