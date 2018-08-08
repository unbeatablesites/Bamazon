var mysql = require("mysql");
var inquirer = require("inquirer");

var name, quantity;

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
    .prompt([{
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
    }])
    .then(function(answer) {
      switch (answer.action) {


      case "DJI Phantom":
        name = answer.action;
        artistSearch();
        break;

      case "DJI Mavic":
        name = answer.action;
        artistSearch();
        break;
        
      case "DJI Spark":
        name = answer.action;
        artistSearch();
        break;

      case "DJI Osmo 1":
        name = answer.action;
        artistSearch();
        break;

      case "DJI Osmo 2":
        name = answer.action;
        artistSearch();
        break;

      case "DJI Osmo 3":
        name = answer.action;
        artistSearch();
        break;

      case "Comfirmation":
        name = answer.action;
        artistSearch2();
        break;

      case "SubtractINV":
        name = answer.action;
        artistSearch3();
        break;

      }
    });
}

function artistSearch() {
  inquirer
    .prompt([{
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
    }])
    .then(function(answer) {
      quantity = answer.Quanitiy;
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
    .prompt([{
      name: "verify",
      type: "rawlist",
      message: "Are you sure you want to buy the this product?",
      choices: [
        "yes",
        "no"
      ]
    }])
    .then(function(answer) {
      var query = "SELECT item_id, department_name, price, stock_quantity, product_name FROM products WHERE ?";
      connection.query(query, { stock_quantity: answer.stock_quantity }, function(err, res) {

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
    .prompt([{
      name: "verify",
      type: "rawlist",
      message: "We will now subtract from the inventory?",
      choices: [
        "yes",
        "no"
      ]
    }])
    .then(function(answer) {
        // if (err) throw err;
        // var inputName = name;
        // var inputQuantity = answer.itemQuantity;
        // console.log(inputName, inputQuantity);
        lookupQuantity(name, quantity);
    })
}

function lookupQuantity(inputName, inputQuantity) {
    connection.query("SELECT * FROM products WHERE item_name = ?", [name], function(err, res) {
        // var updatedQuantity = res[0].stock_quantity - inputQuantity;
        var row = res[0];
        console.log(row);
        console.log(stock_quantity + "Here");    
        connection.query("UPDATE products SET ? WHERE ?", [
            {stock_quantity: updatedQuantity},
            {item_id: inputName}], function(err, res) {
            console.log(res.affectedRows + " record(s) updated ");
            connection.query("SELECT * FROM products", function(err, res) {
                console.log();
        });

    });


    });
    runSearch();
}

var products = [];
var updatedQuantity;
