const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
{
    loomId:{
        type:String,
        required:true
    },

    // =========================
    // THAADAI
    // =========================
    thaadai:{
        type:Number,
        default:0
    },

    thaadaiPirikurathu:{
        type:Number,
        default:0
    },

    // =========================
    // PATTU
    // =========================
    udalPattu:{
        type:Number,
        default:0
    },

    karaiPattu:{
        type:Number,
        default:0
    },

    selpuPattu:{
        type:Number,
        default:0
    },

    // =========================
    // JARIGAI
    // =========================
    selpuJarigai:{
        type:Number,
        default:0
    },

    pettuJarigai:{
        type:Number,
        default:0
    },

    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Material",materialSchema);