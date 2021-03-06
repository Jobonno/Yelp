var mongoose    = require("mongoose");

//Schema SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    image2: String,
    image3: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});

module.exports = mongoose.model("Campground", campgroundSchema);