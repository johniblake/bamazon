module.exports.mysql = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
};

module.exports.columnify = function() {
  return {
    columnSplitter: " | ".gray.dim,
    config: {
      price: {
        align: "right",
        headingTransform: () => {
          return "Price".green.bold;
        },
        dataTransform: data => {
          return "$" + parseFloat(data).toFixed(2);
        }
      },
      product_name: {
        headingTransform: () => {
          return "Name".green.bold;
        }
      },
      item_id: {
        headingTransform: () => {
          return "ID".green.bold;
        }
      },
      stock_quantity: {
        headingTransform: () => {
          return "Available Stock".green.bold;
        },
        dataTransform: data => {
          let quantity = parseInt(data);
          if (quantity <= 5) {
            return data.red;
          } else if (quantity <= 20) {
            return data.yellow;
          }
          return data;
        }
      },
      department_name: {
        headingTransform: () => {
          return "Department".green.bold;
        }
      }
    }
  };
};

module.exports.orderQuestions = [
  {
    type: "number",
    message: "Enter the id of the item you'd like to buy.",
    name: "id"
  },
  {
    type: "number",
    message: "How many do you want?",
    name: "quantity"
  }
];
