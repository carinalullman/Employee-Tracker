var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View all employees",
        "View all departments",
        "View all managers",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"]

    })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all departments":
          departmentView();
          break;

        case "View all managers":
          managerView();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Add Department":
          departmentAdd();
          break;

        case "Add Role":
          roleAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function employeeView() {
  inquirer
    .prompt({
      name: "employeeView",
      type: "input",
      message: "What employee would you like to search for (by last name)?"
    })
    .then(function (answer) {
      var query = "SELECT first_name, last_name, id FROM employee WHERE ?";
      connection.query(query, { last_name: answer.employeeView }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
        }

        runSearch();
      });
    });
}

function departmentView() {
  var query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
}

function managerView() {
  var query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }

    runSearch();
  });
}

function employeeAdd() {
  inquirer
    .prompt({
      name: "employeeAdd",
      type: "input",
      message: ["To ADD an employee, enter Employee First Name then Last Name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}

function departmentAdd() {
  inquirer
    .prompt({
      name: "departmentAdd",
      type: "input",
      message: ["To ADD a department, enter new department name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.employeeAdd;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}

// title, salary, department id
function roleAdd() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter new role name"]
    })
    .then(function (answer) {
      var title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter new role salary"]
        })
        .then(function (answer) {
          var salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter new role department id"]
            })
            .then(function (answer) {
              var department_id = answer.department_id;

              console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

              var query = "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(query, [[[title, salary, department_id]]], function (err, res) {
                if (err) {
                  console.log(err);
                }

                runSearch();
              });
            })
        })
    })

}

function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id",

    })
    .then(function (answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runSearch();

      });
    });
}

function employeeUpdate() {
  console.log('updating emp');
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            runSearch();
          });
        });
    });
}

function employeeManager() {
  inquirer
    .prompt({
      name: "employeeManager",
      type: "input",
      message: "What employee would you like to update the manager for?",
      //choices: need to figure out if we want to pull this by employee and then prompt for manager name
    })
    .then(function (answer) {
      var query = "SELECT manager_id FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employee);
        }

        runSearch();
      });
    });
}
