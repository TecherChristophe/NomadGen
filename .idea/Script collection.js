var MongoClient = require("mongodb").MongoClient;
var mongo = require("mongodb");
var url = "mongodb://localhost:27017";
var Formula = require("./Formula");
var Variable = require("./Variable");
var Question = require("./Question");


MongoClient.connect(url, {useUnifiedTopology : true}, function(err, db){
    if(err) throw err;
    var dbo = db.db("mesdata");


/*
    // Suppression du contenu d'une collection
    dbo.collection('question_augmented').drop(function(err, delOK)
    {
        if (err) throw err;
        console.log(delOK);
    });


 */


/*
    // Ajout d'un nouveau modèle question augmentée
    var newQuestion =



    dbo.collection("question_model").insertOne(newQuestion, function(err,result){
        if (err) throw err;
        console.log("Document inserted");
        db.close;
    });

 */





    /*
     // Ajout d'une nouvelle formule
     var newFormula =


    dbo.collection("formula").insertOne(newFormula, function(err,result3) {
            if (err) throw err;
            console.log("blabla");
    });
     */

/*
   // Ajout d'un nouveau événement
       var newEvent =


    dbo.collection("event").insertOne(newEvent, function(err,result3) {
              if (err) throw err;
              console.log("blabla");
      });

 */

    /*
      // Suppression du contenu d'une collection
      dbo.collection('question_augmented').drop({}, function(err, delOK)
      {
         if (err) throw err;
         console.log(delOK);
      });
       */




    //Recherche dans une collection
  dbo.collection("question_augmented").find({}).toArray(function(err,result){
      if (err) throw err;
      console.log(result);
      db.close();
  })














    /*
    dbo.collection("formula").find({contentType: "formula"}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    */
})


