const  mongoose =require("mongoose");
const { boolean } = require("zod");
mongoose.connect("mongodb+srv://khanlucky2020:yKAnXEZOJqZDRacW@cluster0.xjjyy1w.mongodb.net/todo")
const  todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:{
        type:Boolean,
        default:false}
})

const todo=mongoose.model("todos",todoSchema);
module.exports={
    todo
}