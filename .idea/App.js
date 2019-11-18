'use strict'

//const http = require('http');
//const fs = require('fs');

var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb")
var url = "mongodb://localhost:27017";
var Formula = require("./Formula");
var Variable = require("./Variable");
var Question = require("./Question");

function addNewLocalFormula(formula, infoFormule, callback){

    MongoClient.connect(url, {useUnifiedTopology:  true}, function(err, db){
        if(err) throw err;
        var dbo = db.db("mesdata");
        var Variables = [];
        var gen;
        var temp;
        var who, where;
        var rang;
        var when = 0;

        dbo.collection("formula").findOne({"id": infoFormule.id}, function(err, result){
            if(err) throw err;
            var res;
            for(var i=0; i<result.variables.length; i++)
            {


                if(infoFormule.infoVariables !== undefined && infoFormule.infoVariables.length != 0)
                {

                    who = infoFormule.infoVariables[i].idVariable.split('v');
                    where = parseInt(who[1],16) -1;
                    if(infoFormule.infoVariables[i].interval.length != 0 && where == i)
                    {
                        console.log(i);

                        if(result.variables[when].type == 'integer')
                            gen = Math.floor(Math.random()*(infoFormule.infoVariables[i].interval[0].up - infoFormule.infoVariables[i].interval[0].down) + infoFormule.infoVariables[i].interval[0].down);
                        else
                            gen = Math.random()*(infoFormule.infoVariables[i].interval[0].up - infoFormule.infoVariables[i].interval[0].down) + infoFormule.infoVariables[i].interval[0].down;
                        temp = new Variable(result.variables[where].name, gen);
                        Variables.push(temp);
                        when++;

                    }
                    else if(infoFormule.infoVariables[i].computation != '' &&  where == i)
                    {
                        let scope = {};
                        for(var k=0; k<i; k++)
                            scope.set(Variables[k].name, Variables[k].value);
                        gen = math.evaluate(infoFormule.infoVariables[i].computation,scope);
                        temp = new Variable(result.variables[when].name, gen);
                        Variables.push(temp);
                        when++;

                    }
                    else if(infoFormule.infoVariables[i].list !== undefined && infoFormule.infoVariables[i].list.length != 0 && where == i)
                    {

                        gen = Math.floor(Math.random()*(infoFormule.infoVariables[i].list.length));
                        temp = new Variable(result.variables[when].name, infoFormule.infoVariables[i].list[gen]);
                        Variables.push(temp);
                        when++;
                    }
                    else if(infoFormule.infoVariables[i].linkTo != '' && where == i)
                    {
                        var res = infoFormule.infoVariables[i].linkTo.split('v');
                        for(var l = 0; l<Formula.length; l++)
                        {

                        }
                        var bool = true;
                        var indice;
                        var k = 0
                        while(bool)
                        {
                            if(formula[k].id == res[0])
                            {
                                bool = false;
                                indice = k;
                            }
                            if(k == formula.length) bool = false;
                            k++;
                        }
                        rang = parseInt(res[1],16) -1;
                        temp = new Variable(result.variables[when].name, formula[indice].Variables[rang].value);
                        Variables.push(temp);
                        when++;
                    }
                }
                if(result.variables[i].interval != null && when == i)
                {

                    if(result.variables[when].type == 'integer')
                        gen = Math.floor(Math.random()*(result.variables[i].interval[0].down - result.variables[i].interval[0].up) + result.variables[i].interval[0].up);
                    else
                        gen = Math.random()*(result.variables[i].interval[0].down - result.variables[i].interval[0].up) + result.variables[i].interval[0].up;
                    temp = new Variable(result.variables[when].name, gen);
                    Variables.push(temp);
                    when++;

                }
                else if(result.variables[i].computation != ''  && when == i)
                {
                    let scope = {};
                    for(var k   =0; k<i; k++)
                        scope.set(Variables[k].name, Variables[k].value);
                    gen = math.evaluate(result.variables[i].computation,scope);
                    temp = new Variable(result.variables[when].name, gen);
                    Variables.push(temp);
                    when++;

                }
                else if(result.variables[i].list != null  && when == i)
                {
                    gen = Math.floor(Math.random()*(result.variables[i].list.length));
                    temp = new Variable(result.variables[when].name, result.variables[i].list[gen]);
                    Variables.push(temp);
                    when++;
                }
                }
            var text = result.text;
            for(var k=0; k<Variables.length; k++)
            {
                indice = result.text.indexOf('f');

                while(indice !== -1)
                {

                    if(result.text[indice + 1] === '.')
                    {

                        if(result.text.indexOf(Variables[k].name, indice + 2) < indice + 3)
                        {
                            text = text.replace('f.' + Variables[k].name , Variables[k].value);
                        }
                    }
                    indice = result.text.indexOf('f', indice + 1);
                }
            };
            var dummy = new Formula(infoFormule.id, infoFormule.localId, infoFormule.name, text, Variables);
            callback(null, dummy);
        });

    })
};

function addNewLocalFormulaWithMemory(memory, formula, infoFormule, callback){

    MongoClient.connect(url, {useUnifiedTopology:  true}, function(err, db){
        if(err) throw err;
        var dbo = db.db("mesdata");
        var Variables = [];
        var gen;
        var temp;
        var who, where;
        var rang;
        var when = 0;

        dbo.collection("formula").findOne({"id": infoFormule.id}, function(err, result){
            if(err) throw err;
            var res;
            for(var i=0; i<result.variables.length; i++)
            {


                if(infoFormule.infoVariables !== undefined && infoFormule.infoVariables.length != 0)
                {

                    who = infoFormule.infoVariables[i].idVariable.split('v');
                    where = parseInt(who[1],16) -1;
                    if(infoFormule.infoVariables[i].interval.length != 0 && where == i)
                    {
                        console.log(i);

                        if(result.variables[when].type == 'integer')
                            gen = Math.floor(Math.random()*(infoFormule.infoVariables[i].interval[0].up - infoFormule.infoVariables[i].interval[0].down) + infoFormule.infoVariables[i].interval[0].down);
                        else
                            gen = Math.random()*(infoFormule.infoVariables[i].interval[0].up - infoFormule.infoVariables[i].interval[0].down) + infoFormule.infoVariables[i].interval[0].down;
                        temp = new Variable(result.variables[where].name, gen);
                        Variables.push(temp);
                        when++;

                    }
                    else if(infoFormule.infoVariables[i].computation != '' &&  where == i)
                    {
                        let scope = {};
                        for(var k=0; k<i; k++)
                            scope.set(Variables[k].name, Variables[k].value);
                        gen = math.evaluate(infoFormule.infoVariables[i].computation,scope);
                        temp = new Variable(result.variables[when].name, gen);
                        Variables.push(temp);
                        when++;

                    }
                    else if(infoFormule.infoVariables[i].list !== undefined && infoFormule.infoVariables[i].list.length != 0 && where == i)
                    {

                        gen = Math.floor(Math.random()*(infoFormule.infoVariables[i].list.length));
                        temp = new Variable(result.variables[when].name, infoFormule.infoVariables[i].list[gen]);
                        Variables.push(temp);
                        when++;
                    }
                    else if(infoFormule.infoVariables[i].linkTo != '' && where == i)
                    {
                        var res = infoFormule.infoVariables[i].linkTo.split('v');
                        for(var l = 0; l<Formula.length; l++)
                        {

                        }
                        var bool = true;
                        var indice;
                        var k = 0
                        while(bool)
                        {
                            if(formula[k].id == res[0])
                            {
                                bool = false;
                                indice = k;
                            }
                            if(k == formula.length) bool = false;
                            k++;
                        }
                        rang = parseInt(res[1],16) -1;
                        temp = new Variable(result.variables[when].name, formula[indice].Variables[rang].value);
                        Variables.push(temp);
                        when++;
                    }
                }
                if(result.variables[i].interval != null && when == i)
                {

                    if(result.variables[when].type == 'integer')
                        gen = Math.floor(Math.random()*(result.variables[i].interval[0].down - result.variables[i].interval[0].up) + result.variables[i].interval[0].up);
                    else
                        gen = Math.random()*(result.variables[i].interval[0].down - result.variables[i].interval[0].up) + result.variables[i].interval[0].up;
                    temp = new Variable(result.variables[when].name, gen);
                    Variables.push(temp);
                    when++;

                }
                else if(result.variables[i].computation != ''  && when == i)
                {
                    let scope = {};
                    for(var k   =0; k<i; k++)
                        scope.set(Variables[k].name, Variables[k].value);
                    gen = math.evaluate(result.variables[i].computation,scope);
                    temp = new Variable(result.variables[when].name, gen);
                    Variables.push(temp);
                    when++;

                }
                else if(result.variables[i].list != null  && when == i)
                {
                    gen = Math.floor(Math.random()*(result.variables[i].list.length));
                    temp = new Variable(result.variables[when].name, result.variables[i].list[gen]);
                    Variables.push(temp);
                    when++;
                }
            }
            var text = result.text;
            for(var k=0; k<Variables.length; k++)
            {
                indice = result.text.indexOf('f');

                while(indice !== -1)
                {

                    if(result.text[indice + 1] === '.')
                    {

                        if(result.text.indexOf(Variables[k].name, indice + 2) < indice + 3)
                        {
                            text = text.replace('f.' + Variables[k].name , Variables[k].value);
                        }
                    }
                    indice = result.text.indexOf('f', indice + 1);
                }
            };
            var dummy = new Formula(infoFormule.id, infoFormule.localId, infoFormule.name, text, Variables);
            callback(null, dummy);
        });

    })
};

function recursiveformula(err, result){
    if(err) throw err;
    if(result.compteur < result.model.formula.length -1){
        result.compteur++;
        addNewLocalFormula(result, result.formula, infoFormula, callback);
    }
    else{
        endgame(result.model, result.formula);
    }

}

function endgame(model, formula){
    console.log(formula[0].Variables[0].name + ': ' + formula[0].Variables[0].value);
    console.log(formula[0].Variables[1].name + ': ' + formula[0].Variables[1].value);
    console.log(formula[2].Variables[2].name + ': ' + formula[2 ].Variables[2].value);
    //console.log("La formule a bien été généré: ");
    var content = model.content;
    var indice;
    while(formula.length !== model.formula.length){}
    for(var k=0; k<i; k++)
    {
        indice = content.indexOf(formula[k].name);
        while(indice !== -1)
        {
            if(content[indice + 2] === '.')
            {
                if(content.indexOf('text', indice + 3) < indice + 4) content = content.replace(formula[k].name + '.text', formula[k].text);
            }
            indice = content.indexOf(formula[k].name, indice + 1);
        }
    };
    console.log(content);
    var answers = [];
    var explanation = "";
    for(var j = 0; j<model.numberOfAnswersTotal; j++)
    {
        var temp;
        if(model.choices[j].eventId === '')
        {
            temp = model.choices[j].content;
            for(var k =0; k<model.choices[j].numberOfAnswers; k++)
            {
                for(var m=0;m<i;m++) {
                    indice = model.choices[j].content.indexOf(formula[m].name);
                    while (indice !== -1) {
                        if (model.choices[j].content[indice + 2] === '.') {
                            if (model.choices[j].content.indexOf('texte', indice + 3) < indice + 4) temp = model.choices[j].content.replace(formula[m].name + '.texte', formula[m].text);
                        }
                        indice = model.choices[j].content.indexOf(formula[m].name, indice + 1);

                        answers.push({ content: temp, explanation: model.choices[j].explanation});
                    }

                }
                console.log('Réponse ' + (j + k + 1) + ': ' + temp);
            }
        }
        else{
            temp = model.choices[j].content;
            explanation = model.choices[j].explanation;
            for(var k=0; k<model.choices[j].numberOfAnswers; k++){
                dbo.collection('event').findOne({_id: model.choices[j].eventId}, function(err, event){
                    indice = model.choices[j].content.indexOf('e');
                    while(indice !== -1){
                        if(model.choices[j].content[indice + 1] === '.'){
                            if(model.choices[j].content.indexOf('name', indice + 2) < indice + 3) temp = model.choices[j].content.replace('e.name', event.name);
                            if(model.choices[j].content.indexOf('explanation', indice + 2) < indice + 3) temp = model.choices[j].content.replace('e.explanation', event.explanation);
                        }
                        indice = model.choices[j].content.indexOf('e', indice + 1);
                    }

                    indice = model.choices[j].explanation.indexOf('e');
                    while(indice !== -1){
                        if(model.choices[j].explanation[indice + 1] === '.'){
                            if(model.choices[j].explanation.indexOf('explanation', indice + 2) < indice + 3) explanation = model.choices[j].explanation.replace('e.explanation', e.explanation);
                        }
                        indice = model.choices[j].explanation.indexOf('e', indice + 1);
                    }
                    answers.push({content: temp, explanation: explanation});
                })
            }
        }
    }
    while(answers.length < model.numberOfAnswersTotal){}
    var question = new Question(model._id, model.title, content, formula, answers);
    question.save('mesdata', 'question_augmented', question)

    console.log("C'est fini !");


}

function  generateAnswers(dbo, model, compteur, formula, answers, callback){

    var test = 0;

    if(model.choices[compteur].eventId !== '') {;
        var temp = model.choices[compteur].content;
        var explanation = model.choices[compteur].explanation;
        for(var k=0; k<model.choices[compteur].numberOfAnswers; k++){
            dbo.collection("event").findOne({_id: new mongo.ObjectId(String(model.choices[compteur].eventId))}, function(err, event){
                if(err) console.log("erreur au niv : " + compteur);
                var indice = model.choices[compteur].content.indexOf('e');
                while(indice !== -1){
                    if(model.choices[compteur].content[indice + 1] === '.'){
                        if(model.choices[compteur].content.indexOf('name', indice + 2) < indice + 3 ) {
                            temp = model.choices[compteur].content.replace('e.name', event.name);

                        }
                        /*
                        if(model.choices[compteur].content.indexOf('explanation', indice + 2) < indice + 3 && model.choices[compteur].content.indexOf('explanation', indice + 2) > 0 ){
                            temp = model.choices[compteur].content.replace('e.explanation', event.explanation);
                            console.log("noooooooooooooo !");
                        }
                        */
                        console.log('réponse : ' + temp);
                    }
                    indice = model.choices[compteur].content.indexOf('e', indice + 1);
                }

                indice = model.choices[compteur].explanation.indexOf('e');
                while(indice !== -1){;
                    if(model.choices[compteur].explanation[indice + 1] === '.'){
                        if(model.choices[compteur].explanation.indexOf('explanation', indice + 2) < indice + 3) explanation = model.choices[compteur].explanation.replace('e.explanation', event.explanation);
                    }
                    indice = model.choices[compteur].explanation.indexOf('e', indice + 1);
                }
                var answer = {content: temp, explanation: explanation};
                answers.push(answer);
                var result = {answers: answers, compteur: compteur, dbo: dbo, formula: formula, model: model};
                callback(null, result);
            });

        }
    }
    else {
        var answer = {content: temp, explanation: explanation};
        answers.push(answer);
        var result = {answers: answers, compteur: compteur, dbo: dbo, formula: formula, model: model};
        callback(null, result);
    }


}
function  generateAnswersWithMemory(memory, dbo, model, compteur, callback){

    var test = 0;
    if(model.choices[compteur].eventId !== '') {
        var temp = model.choices[compteur].content;
        var explanation = model.choices[compteur].explanation;
        for(var k=0; k<model.choices[compteur].numberOfAnswers; k++){
            dbo.collection("event").findOne({_id: new mongo.ObjectId(String(model.choices[compteur].eventId))}, function(err, event){
                if(err) console.log("erreur au niv : " + compteur);
                var indice = model.choices[compteur].content.indexOf('e');
                while(indice !== -1){
                    if(model.choices[compteur].content[indice + 1] === '.'){
                        if(model.choices[compteur].content.indexOf('name', indice + 2) < indice + 3) temp = model.choices[compteur].content.replace('e.name', event.name);
                       // if(model.choices[compteur].content.indexOf('explanation', indice + 2) < indice + 3) temp = model.choices[compteur].content.replace('e.explanation', event.explanation);
                        console.log('réponse : ' + temp);
                    }
                    indice = model.choices[compteur].content.indexOf('e', indice + 1);
                }

                indice = model.choices[compteur].explanation.indexOf('e');
                while(indice !== -1){
                    if(model.choices[compteur].explanation[indice + 1] === '.'){
                        if(model.choices[compteur].explanation.indexOf('explanation', indice + 2) < indice + 3) explanation = model.choices[compteur].explanation.replace('e.explanation', event.explanation);
                    }
                    indice = model.choices[compteur].explanation.indexOf('e', indice + 1);
                }
                var answer = {content: temp, explanation: explanation};
                memory.answers.push(answer);
                callback(null, memory);
            });

        }
    }
    else {
        var answer = {content: temp, explanation: explanation};
        memory.answers.push(answer);
        callback(null, memory);
    }


}

function recursiveAnswer(err, result) {
    if (err) throw err;
    if (result.compteur < result.model.numberOfAnswersTotal - 1) {
        result.compteur++;
        generateAnswersWithMemory(result, result.dbo, result.model, result.compteur, recursiviteAnswer);
    } else {
        var question = new Question(result.model._id, result.model.title, result.model.content, result.formula, result.answers);
        question.save('mesdata', 'question_augmented', question)

        console.log("C'est fini !");
    }
}

MongoClient.connect(url, {useUnifiedTopology : true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mesdata");

    var model;
    // Génération d'une question à partir d'un modèle
    // 5dce869f1b3fc921087c93bc (Histoire)
    // 5dc41ea3a59d661dbc0db501 (Math)
    dbo.collection("question_model").findOne({_id: new mongo.ObjectId('5dc41ea3a59d661dbc0db501')}, function(err,model)
    {
        if (err) throw err;
        console.log("Le modèle a été chargé");
        var formula = [];
        if(model.formula.length > 1)
        {
            for(var i = 0; i < model.formula.length; i++)
            {

                if(i != model.formula.length - 1 )
                    addNewLocalFormula(formula, model.formula[i], function(err,dummy){
                        if(err) throw err;
                        formula.push(dummy);

                        //console.log("La formule a bien été généré: ");
                    });
                else
                    addNewLocalFormula(formula,model.formula[i], function(err,dummy){
                        if(err) throw err;
                        formula.push(dummy);
                        while(formula.length < model.formula.length - 1){}
                        console.log(formula[0].Variables[0].name + ': ' + formula[0].Variables[0].value);
                        console.log(formula[0].Variables[1].name + ': ' + formula[0].Variables[1].value);
                        console.log(formula[2].Variables[2].name + ': ' + formula[2 ].Variables[2].value);
                        //console.log("La formule a bien été généré: ");
                        var content = model.content;
                        var indice;
                        while(formula.length !== model.formula.length){}
                        for(var k=0; k<i; k++)
                        {
                            indice = content.indexOf(formula[k].name);
                            while(indice !== -1)
                            {
                                if(content[indice + 2] === '.')
                                {
                                    if(content.indexOf('text', indice + 3) < indice + 4) content = content.replace(formula[k].name + '.text', formula[k].text);
                                }
                                indice = content.indexOf(formula[k].name, indice + 1);
                            }
                        };
                        console.log(content);
                        var answers = [];
                        var explanation = "";
                        for(var j = 0; j<model.numberOfAnswersTotal; j++)
                        {
                            var temp;
                            if(model.choices[j].eventId === '')
                            {
                                temp = model.choices[j].content;
                                for(var k =0; k<model.choices[j].numberOfAnswers; k++)
                                {
                                    for(var m=0;m<i;m++) {
                                        indice = model.choices[j].content.indexOf(formula[m].name);
                                        while (indice !== -1) {
                                            if (model.choices[j].content[indice + 2] === '.') {
                                                if (model.choices[j].content.indexOf('texte', indice + 3) < indice + 4) temp = model.choices[j].content.replace(formula[m].name + '.texte', formula[m].text);
                                            }
                                            indice = model.choices[j].content.indexOf(formula[m].name, indice + 1);

                                            answers.push({ content: temp, explanation: model.choices[j].explanation});
                                        }

                                    }
                                    console.log('Réponse ' + (j + k + 1) + ': ' + temp);
                                }
                            }
                            else{
                                temp = model.choices[j].content;
                                explanation = model.choices[j].explanation;
                                for(var k=0; k<model.choices[j].numberOfAnswers; k++){
                                    dbo.collection('event').findOne({_id: model.choices[j].eventId}, function(err, event){
                                        indice = model.choices[j].content.indexOf('e');
                                        while(indice !== -1){
                                            if(model.choices[j].content[indice + 1] === '.'){
                                                if(model.choices[j].content.indexOf('name', indice + 2) < indice + 3) temp = model.choices[j].content.replace('e.name', event.name);
                                                if(model.choices[j].content.indexOf('explanation', indice + 2) < indice + 3) temp = model.choices[j].content.replace('e.explanation', event.explanation);
                                            }
                                            indice = model.choices[j].content.indexOf('e', indice + 1);
                                        }

                                        indice = model.choices[j].explanation.indexOf('e');
                                        while(indice !== -1){
                                            if(model.choices[j].explanation[indice + 1] === '.'){
                                                if(model.choices[j].explanation.indexOf('explanation', indice + 2) < indice + 3) explanation = model.choices[j].explanation.replace('e.explanation', e.explanation);
                                            }
                                            indice = model.choices[j].explanation.indexOf('e', indice + 1);
                                        }
                                        answers.push({content: temp, explanation: explanation});
                                    })
                                }
                            }
                        }
                        while(answers.length < model.numberOfAnswersTotal){}
                        var question = new Question(model._id, model.title, content, formula, answers);
                        question.save('mesdata', 'question_augmented', question)

                        console.log("C'est fini !");

                    })

            }
        }
        else
        {
            console.log(model.content);
            var answers = [];
            var explanation = "";
            var compteur = 0;
            generateAnswers(dbo, model, compteur, formula, answers, recursiviteAnswer);

        }


    });

});


/*
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.end('Hello World');

}).listen(8080);
*/
