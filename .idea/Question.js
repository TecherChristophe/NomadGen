'use strict'
var internal = {};
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

module.exports = internal.Question = class {

    constructor(modelID, name, content, Formules, Answers,numberOfFalseAnswers) {
        this.modelId = modelID;
        this.name = name;
        this.content = content;
        this.Formules = Formules;
        this.Answers = Answers;
        this.numbeOfFalseAnswers = numberOfFalseAnswers;
    }


    save(database, collection, question){
        MongoClient.connect(url, {useUnifiedTopology : true}, function(err, db){
            if(err) throw err;
            var dbo = db.db(database);

            dbo.collection(collection).insertOne(question, function(err, result){
                if(err) throw err;
            })
        })
    }

}

/*
constructor
 */