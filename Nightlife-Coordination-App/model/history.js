const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    placeId:{
        type: String,
        trim: true,
        index: true,
        require: true
    },
    goingCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('SearchResult',historySchema);