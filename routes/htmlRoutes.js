var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    } else {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  });

  // Load signup page
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    } else {
      res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
  });

  // Load contact page
  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

   // Load members home page
   app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  }); 

  // example of a locked down route
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
    // with handlebars:
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //   res.render("example", {
    //     example: dbExample
    //   });
    // });
    // });
  });


  app.get("/search", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log(req.query);
    
    db.Person_missing.findAll({
      where: {
        City_Of_Last_Contact: req.query.City_Of_Last_Contact,
        State_Of_Last_Contact: req.query.State_Of_Last_Contact
      }
    }).then(function(dbPerson_missing) {
        console.log(dbPerson_missing);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
