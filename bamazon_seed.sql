DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(255),
  price DECIMAL(10,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Potted Plant", "Home & Garden", 10.0, 100),
("Harry Potter", "Books", 23.50, 10000),
("Inception", "Video", 3.99, 10000),
("Schwinn Bike", "Outdoor", 400.0, 253),
("iPhone Xs", "Technology", 1000.0, 18098),
("Samsung Smart TV", "Technology", 500.0, 2030),
("Patterned Rug", "Home & Garden", 34.75, 150),
("Polar Express", "Video", 9.99, 10000),
("Eno Hammock", "Outdoor", 30.0, 100),
("Born a Crime", "Books", 22.50, 12000);

SELECT * FROM products;