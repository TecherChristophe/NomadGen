'use strict'

//const http = require('http');
//const fs = require('fs');

var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb")
var url = "mongodb://localhost:27017";
var Formula = require("./Formula");
var Variable = require("./Variable");
var Question = require("./Question");
var latex = require("./latex-to-js");
var math = require('mathjs');
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// Exemple pré-chargé: 5dcea9ca676b8b0c39299ace

readline.question(`Quel modèle de quizz voulez-vouz utiliser?`, (id) => {
MongoClient.connect(url, {useUnifiedTopology: true}, function(err,db) {
    if (err) throw err;
    var dbo = db.db("mesdata");

    dbo.collection('quizz_augmented').findOne({_id: new mongo.ObjectId(`${id}`)}, function (err, quizz) {

        for (var i = 0; i < quizz.questions.length; i++) {
            for (var j = 0; j < quizz.questions[i].numberOfQuestion; j++) {
                dbo.collection('question_augmented').find({modelId: new mongo.ObjectId(quizz.questions[i].questionsId)}).toArray(function (err, result) {
                    var rand = Math.round(Math.random() * (result.length - 1));
                    console.log(result[rand].content);
                    var random = [];
                    random.push(result[rand].Answers[0]);
                    // console.log("réponse " + (1) + ": " + result[rand].Answers[0].content);
                    var temp = result[rand].Answers.slice(1);
                    for (var k = 0; k < result[rand].numbeOfFalseAnswers; k++) {

                        var temprand = Math.floor(Math.random() * (temp.length));
                        // console.log("réponse " + (k+2) + ": " + temp[temprand].content);
                        if (temprand !== temp.length) {
                            random.push(temp[temprand]);
                            temp.splice(temprand, 1);
                        } else k--;

                    }
                    var taille = random.length;
                    for (var k = 0; k < taille; k++) {
                        var temprand = Math.floor(Math.random() * (random.length - 1));
                        if (temprand !== random.length) {
                            console.log("réponse " + (k + 1) + ": " + random[temprand].content);
                            random.splice(temprand, 1);
                        } else k--;


                    }

                    console.log("\n");
                    db.close();
                })
            }
        }
    })
})

})