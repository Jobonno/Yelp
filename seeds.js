var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");                                                          
 
 var data = [
     {
         name: "Cloud's Rest",
         image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
         description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
     }, {
         name: "Big Man Camp",
         image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
         description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
     }, {
         name: "ShitHole Campers",
         image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
         description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
     }
     ];
 
function seedDB(){
    //remove campgrounds
    Campground.remove({}, function(err){
        if(err){
           console.log(err);
         }else{
            console.log("removed Campgrounds");
            //add a few campgrounds
             data.forEach(function(seed){
                 Campground.create(seed, function(err, campground){
                     if(err){
                       console.log(err);
                     }else{
                       console.log("added a campground");
                       //create comments
                       Comment.create(
                           {
                               text: "This place is great, but no internet",
                               author: "Homer"
                           }, function(err, comment){
                               if(err){
                                   console.log(err);
                               }else{
                                   
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("comment added");
                               }
                           });
                 }
        
         });
     });
     
        }
     
     }); 
     
     //add a few comments
} 
 
 module.exports = seedDB;
   
    