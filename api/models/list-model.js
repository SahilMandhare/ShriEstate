import mongoose from "mongoose";

export const listSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    regularPrice:{
        type: Number,
        required: true
    },
    discountPrice:{
        type: Number,
        required: true
    },
    bedrooms:{
        type: String,
        required: true
    },
    bathrooms:{
        type: String,
        required: true
    },
    furnished:{
        type: Boolean,
        required: true
    },
    parking:{
        type: Boolean,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    offer:{
        type: Boolean,
        required: true
    },
    imageUrls:{
        type: Array,
        required: true
    },
    useRef:{
        type: String,
        required: true
    },
},{timestamps:true})

const List = mongoose.model("lists", listSchema)

export default List