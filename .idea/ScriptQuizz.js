'use strict'

//const http = require('http');
//const fs = require('fs');

var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb")
var url = "mongodb://localhost:27017";
var Formula = require("./Formula");
var Variable = require("./Variable");
var Question = require("./Question");

MongoClient.connect(url, {useUnifiedTopology: true}, function(err,db){
    if(err) throw err;
    var dbo = db.db("mesdata");

    dbo.collection('quizz_augmented').findOne({}, function(err, quizz){

        for(var i=0; i< quizz.questions.length; i++)
        {
            for(var j =0; j<quizz.questions[i].numberOfQuestion; j++)
            {
                dbo.collection('question_augmented').find({modelId: new mongo.ObjectId(quizz.questions[i].questionsId)}).toArray(function(err,result){
                    var rand = Math.floor(Math.random()*(result.length - 1))
                    console.log(result[rand].content);
                    for(var k = 0; k<result[rand].Answers.length; k++) console.log("réponse " + (k+1) + ": " + result[rand].Answers[k].content);
                    console.log("\n");
                })
            }
        }
    })


})