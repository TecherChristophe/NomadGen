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
      dbo.collection('question_model').deleteOne({_id: new mongo.ObjectId("5dc41ea3a59d661dbc0db501")}, function(err, delOK)
      {
         if (err) throw err;
         console.log(delOK);
      });
*/

/*
  dbo.collection("question_model").updateOne({_id: new mongo.ObjectId("5dce869f1b3fc921087c93bc")},{$set:{numberOfAnswersWanted: 3}}, function(err,result){
    if(err) throw err;
    console.log("updated successfully");
  })

 */

    dbo.collection('question_model').find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    })
/*
    //Recherche dans une collection
    dbo.collection("member").find({_id: new mongo.ObjectId('5b60f1445c3578191a1d5f96')}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);

        dbo.collection('branch').find({_id: result[0].branch}).toArray(function(err, branch) {
            if (err) throw err;
            console.log(branch)

        })

        dbo.collection('levelofeducation').find({_id: new mongo.ObjectId(result[0].levelOfEducation)}).toArray(function(err, loe) {
            if (err) throw err;
            console.log(loe)

        })

        dbo.collection('memberlevel').find({_id: new mongo.ObjectId(result[0].level)}).toArray(function(err, loe) {
            if (err) throw err;
            console.log(loe)

        })




        db.close();

    });


 */

    /*
    dbo.collection("formula").find({contentType: "formula"}).toArray(function(err, result) {
        if (err) throw err;:
        console.log(result);
        db.close();
    });
    */
})




