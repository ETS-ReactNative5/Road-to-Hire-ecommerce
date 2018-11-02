var mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
require("./connection");

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    //For contact form info
    extended: true
  })
);

app.get("/products", function(req, res) {
  connection.query("select * from ecommerceproducts", function(error, results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get("/form_submission", function(req, res) {
  connection.query("select * from contactinfos", function(error, results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/products", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO ecommerceproducts SET ?", postData, function(
    error
  ) {
    if (error) throw error;
    // res.redirect("https://jmcatee25.github.io/Road-to-Hire-ecommerce/Admin");
    res.redirect("localhost:3000/Admin");
  });
});

app.post("/form_submission", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO contactinfos SET ?", postData, function(error) {
    if (error) throw error;
    // res.redirect("https://jmcatee25.github.io/Road-to-Hire-ecommerce/Contact");
    res.redirect("localhost:3000/Admin");
  });
});

app.put("/products", function(req, res) {
  connection.query(
    "UPDATE `ecommerceproducts` SET `name`=?,`price`=?,`description`=?,`category`=?,`availability`=?,`productImageurl`=? where `productID`=?",
    [
      req.body.name,
      req.body.price,
      req.body.description,
      req.body.category,
      req.body.availability,
      req.body.productImageurl,
      req.body.productID
    ],
    function(error, results) {
      if (error) throw error;
      // res.redirect("https://jmcatee25.github.io/Road-to-Hire-ecommerce/Admin");
      res.redirect("localhost:3000/Admin");
    }
  );
});

app.delete("/products/:id", function(req, res) {
  const id = req.params.id;
  connection.query(
    `DELETE FROM ecommerceproducts WHERE productID=${id}`,
    function(error) {
      if (error) throw error;
      // res.redirect("https://jmcatee25.github.io/Road-to-Hire-ecommerce/Admin");
      res.redirect("localhost:3000/Admin");
    }
  );
});

app.delete("/form_submission/:id", function(req, res) {
  const id = req.params.id;
  connection.query(`DELETE FROM contactinfos WHERE contactID=${id}`, function(
    error
  ) {
    if (error) throw error;
    // res.redirect("https://jmcatee25.github.io/Road-to-Hire-ecommerce/Admin");
    res.redirect("localhost:3000/Admin");
  });
});

app.listen(3001);