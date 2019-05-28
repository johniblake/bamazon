require("dotenv").config();
let columnify = require("columnify");
let inquirer = require("inquirer");
let colors = require("colors");
let service = require("./customerService");
let config = require("./config");

async function init() {
  await service.connectToDB();

  // establish event loop
  // flow:
  // show store -> wait for order -> validate order -> perform order --^
  while (true) {
    try {
      console.clear();

      // show store
      await listItems();

      //wait for order
      let order = await getOrder();

      // validate order
      if (isValid(order)) {
        //perform order
        await service.makeOrder(order);
      } else {
        console.log(`Invalid Request. Try again.`.inverse);
        await delay(2000);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
//initialize app
init();

//query db for all available products and log them to the console
async function listItems() {
  console.log(`\nAvailable Items`.bold.underline, `\n`);

  let data = await service.getAvailableItems();
  return _displayData(data);
}

//get user's order and return it as an object with id and quantity properties
async function getOrder() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(config.orderQuestions) // which item id? how many?
      .then(function(response) {
        resolve({ id: response.id, quantity: response.quantity });
      });
  });
}

// logs products table after 'columnifying' it.
function _displayData(data) {
  console.log(columnify(data, config.columnify()) + "\n");
}

// simple validator to ensure input is of the proper form
function isValid(order) {
  if (isNaN(order.id) || isNaN(order.quantity)) {
    return false;
  } else {
    return true;
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
