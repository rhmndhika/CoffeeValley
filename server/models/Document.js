const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true,
    },
    documentFile : {
        type: String,
        require: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

const DocumentModel = mongoose.model("documents", DocumentSchema);

module.exports = DocumentModel;