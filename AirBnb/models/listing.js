const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js")
const Schema = mongoose.Schema;

let ListingSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type: String,
    },
    image :{
        url: String,
        filename:String,
       },
    price: {
        type: Number,
        required:true,
    },
    location:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:true,
    },
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review',
    }],
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

ListingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        console.log(listing.reviews)
        await Review.deleteMany({_id : {$in: listing.reviews}})
        
    }
})

let Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;