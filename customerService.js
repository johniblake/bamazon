let config = require("./config.js");
let mysql = require("mysql");
var connection = mysql.createConnection(config.mysql);

module.exports.connectToDB = async function() {
  return new Promise((resolve, reject) => {
    connection.connect(async function(err) {
      if (err) throw err;

      console.log(`connected as id ${connection.threadId}
          `);
      resolve();
    });
  });
};

module.exports.makeOrder = async function(order) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT item_id, product_name, stock_quantity, price FROM products WHERE item_id=" +
        order.id,
      function(err, item) {
        if (err) throw err;
        if (item.length === 0) {
          console.log(
            "Item with that ID does not exist. Make another selection."
          );
          setTimeout(resolve, 2000);
        } else {
          let quantity = item[0].stock_quantity;
          let itemName = item[0].product_name;
          let price = parseFloat(item[0].price);
          if (quantity >= order.quantity) {
            let newQuantity = quantity - order.quantity;
            let priceTotal = (order.quantity * price).toFixed(2);
            connection.query(
              "UPDATE products SET stock_quantity=" +
                newQuantity +
                " WHERE item_id =" +
                order.id,
              function(err) {
                if (err) throw err;
                console.log(
                  `You bought ${
                    order.quantity
                  } ${itemName}(s) for a total of $${priceTotal}.`
                );
                setTimeout(resolve, 2000);
              }
            );
          } else {
            console.log(
              "There are only " +
                quantity +
                " left. Please submit a different order."
            );
            setTimeout(resolve, 2000);
          }
        }
      }
    );
  });
};

module.exports.getAvailableItems = async function() {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0",
      function(err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });
};
