<!DOCTYPE html>

# bamazon

A basic exercise for querying and updating a MySQL database using node and the terminal.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IS7J--SFXv4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1. To run bamazonCustomer.js first, create a MySQL server and hook it up to MySQLWorkbench. Copy the contents of bamazon_seed.sql into a new tab in MySQLWorkbench and execute it to initialize your store.

2. In config.js supply all of the information you'll need to connect to your MySQL database (port, host, database name, username, password).

3. run the app with

   > `node bamazonCustomer.js`

4. The app should then prompt you with two messages.

   - The first should ask you the ID of the product you would like to buy.
   - The second message should ask how many units of the product you would like to buy.

5. Once you have placed your order, the application will check if the store has enough of the product to meet the customer's request.

   - If not, the app will alert you that there is an insufficient quantity of the product, and then prevent the order from going through.

6. However, if the store _does_ have enough of the product:
   - The SQL database will be updated to reflect the quantity of the product remaining after the purchase.
   - Once the update goes through, you will see the total cost of your purchase.
