var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//index route
router.get("/", function(req,res){
        //Get all Campgrounds from db
        Campground.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
               res.render("campgrounds/index", {campGrounds:allCampgrounds});
           }
        });
        
});

//create route
router.post("/", middleware.isLoggedIn ,function(req, res){
   //get data from form and add to array
   var name = req.body.name;
   var price = req.body.price;
   var img = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name:name, price:price ,image:img, description:desc, author:author};
   Campground.create(newCampground, function(err, newCamp){
      if(err){
          console.log(err);
      }else {
          //redirect to campgrounds page
          res.redirect("/campgrounds");
      } 
   });

});

//new route
router.get("/new", middleware.isLoggedIn ,function(req,res){
   res.render("campgrounds/new.ejs"); 
});

//SHow route
router.get("/:id", function(req, res){
    //find the campground by id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with campground info
            res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
                //is user logged in
                Campground.findById(req.params.id, function(err, foundCampground){
                    res.render("campgrounds/edit", {campground: foundCampground});
                });            
        });
             
    //does user own campground
    //if not redirect
   
    



//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){
    
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
            }else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;