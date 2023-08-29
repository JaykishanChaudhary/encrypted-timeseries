const mongoose=require('mongoose');

const DataSchema=new mongoose.Schema({
    name:{
        type:String
    },
    origin:{
        type:String
    },
    destination:{
        type:String
    }
},{
    timestamps:true
})

const DataModel=mongoose.model('Data',DataSchema);

module.exports=DataModel;