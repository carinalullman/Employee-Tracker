var inquirer = require("inquirer");
//var consoleTable = require("console.table");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3030,
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
      name: "options",
      message: "What would you like to do?",
      choices: ["View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "exit"]

    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          employeeView();
          break;

        case "View all employees by department":
          departmentView();
          break;

        case "View all employees by manager":
          managerView();
          break;

        case "Add Employee":
          employeeAdd();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Update Employee Manager":
          employeeManager();
          break;

        case "exit":
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
      message: "What employee would you like to search for?"
    })
    .then(function (answer) {
      var query = "SELECT first_name, last_name FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name);
        }
        runSearch();
      });
    });
}

function departmentView() {
  inquirer
    .prompt({
      name: "departmentView",
      type: "rawlist",
      message: "View all employees by department",
    })
    .then(function (answer) {
      var query = "SELECT dept_name FROM department WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].department);
        }
        runSearch();
      });
    });
}

function managerView() {
  inquirer
    .prompt({
      name: "managerView",
      type: "rawlist",
      message: "View all employees by manager"
    })
    .then(function (answer) {
      var query = "SELECT manager_id FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].department);
        }
        runSearch();
      });
    });
}
// function employeeAdd() {
//   inquirer
//     .prompt({
//       name: "employeeAdd",
//       type: "input",
//       message: ["Enter Employee First Name", "Enter Employee Last Name"]
//       //the code above in "message" might be wrong, need to look that up
//     })
//     //this needs to be a prompt to enter first and last name to the employee table so change code below!
//   //   .then(function (answer) {
//   //     var query = "//SELECT manager_id FROM employee WHERE ?";
//   //     connection.query(query, function (err, res) {
//   //       for (var i = 0; i < res.length; i++) {
//   //         console.log(res[i].department);
//   //       }
//   //       runSearch();
//   //     });
//   //   });
//   // }

function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "What employee would you like to remove?",
      choices: ["first_name", "last_name"]
    })
    .then(function (answer) {
      //need to write a removal line below
      var query = "SELECT first_name FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].employeeAdd);
        }
        runSearch();
      });
    });
}
function employeeUpdate() {
  inquirer
    .prompt({
      name: "employeeUpdate",
      type: "input",
      message: "What would you like to update?",
      choices: ["first_name", "last_name", "role_id", "manager_id"]
    })
    .then(function (answer) {
      var query = "SELECT name FROM employee WHERE ?";
      connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].department);
        }
        runSearch();
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
// //all this code below needs to be fixed to reflect a connection end
//   function exit() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function (value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function (value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function (answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function (err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }

//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function (answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//           console.log(
//             "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//           );
//           runSearch();
//         });
//       });
//   }

//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function (answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//         connection.query(query, [answer.artist, answer.artist], function (err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               i + 1 + ".) " +
//               "Year: " +
//               res[i].year +
//               " Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album
//             );
//           }

//           runSearch();
//         });
//       });
//   }
//   ////////////////////////////////////////////////////////
//   function promptUser() {
//     return inquirer.prompt(
//       {
//         type: "list",
//         name: "options",
//         message: "What would you like to do?",
//         choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
//         //need to add conditionals to whatever choice is selected and add addtional questions
//         //What is the employee's first name?
//         //What is the employee's last name?
//         //Which employee do you want to remove? - needs to bring up list of employees
//         //What role would you like to update it to?
//         //Who is the employee's manager?
//         //.then(answers => {
//         //  console.log("answer:", answers.choices);
//         // })

//         // should wrap these "answers/choices" in an object?

//         //  var department = { 
//         //     id 
//         //     dept_name 
//         //}
//         //  var role = {
//         //     id 
//         //     title 
//         //     salary 
//         //     department_id 
//         //}
//         // var employee = {
//         //     id
//         //     first_name 
//         //     last_name 
//         //     role_id 
//         //     manager_id
//         // }





//       });
//   }
