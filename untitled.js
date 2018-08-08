var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to buy?",
      choices: [
        "DJI Phantom",
        "DJI Mavic",
        "DJI Spark",
        "DJI Osmo 1",
        "DJI Osmo 2",
        "DJI Osmo 3",
        "Iphone 1",
        "Iphone 2",
        "Iphone 3"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {


      case "DJI Phantom":
        artistSearch();
        break;

      case "DJI Mavic":
        artistSearch();
        break;
        
      case "DJI Spark":
        artistSearch();
        break;

      case "DJI Osmo 1":
        artistSearch();
        break;

      case "DJI Osmo 2":
        artistSearch();
        break;

      case "DJI Osmo 3":
        artistSearch();
        break;

      case "Comfirmation":
        artistSearch2();
        break;

      case "SubtractINV":
        artistSearch3();
        break;

      }
    });
}

function artistSearch() {
  inquirer
    .prompt({
      name: "Quanitiy",
      type: "rawlist",
      message: "How many would you like to buy?",
      choices: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ]
    })
    .then(function(answer) {
      var query = "SELECT item_id, department_name, price, stock_quantity, product_name FROM products WHERE ?";
      connection.query(query, { item_id: answer.Quanitiy }, function(err, res) {
        var amt = [];
       for (var i = 0; i < res.length; i++) {
          console.log("Quantity Purchasing: " + answer.Quanitiy + " || Product Name: " + res[i].product_name + " || Department Name: " + res[i].department_name + " || Price: $" + res[i].price + " || Product left after Purchase: " + (res[i].stock_quantity - answer.Quanitiy));
          
        }
        artistSearch2();
      });
    });
}


function artistSearch2() {
  inquirer
    .prompt({
      name: "verify",
      type: "rawlist",
      message: "Are you sure you want to buy the this product?",
      choices: [
        "yes",
        "no"
      ]
    })
    .then(function(answer) {
      var query = "SELECT item_id, department_name, price, stock_quantity, product_name FROM products WHERE ?";
      connection.query(query, { item_id: answer.item_id }, function(err, res) {

       if(answer.verify == "yes"){
        console.log("Yes Working"); 
       }else{


        console.log("Still working");
       }

        artistSearch3();
      });
    });
}


function artistSearch3() {
  inquirer
    .prompt({
      name: "verify",
      type: "rawlist",
      message: "We will now subtract from the inventory?",
      choices: [
        "yes",
        "no"
      ]
    })
    .then(function(answer) {
      var query = "SELECT item_id, department_name, price, stock_quantity, product_name FROM products WHERE ?";
      connection.query(query, { item_id: answer.item_id }, function(err, res) {

       if(answer.verify == "yes"){
        console.log("Yes Working"); 
       }else{


        console.log("Still working bro");
       }

        runSearch();
      });
    });
}


// function multiSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }

// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

//       connection.query(query, [answer.artist, answer.artist], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album +
//               " || Year: " +
//               res[i].year
//           );
//         }

//         runSearch();
//       });
//     });
// }

