// @author: Sal Giani
// @github: sallybananas
// @comment: Assignment 13 - Mentor Finder Express Node app



console.log('API Route Connected Successfully');


// Link in Mentor Data
var mentorData = require('../data/mentors.js');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/mentors. This will be used to display a JSON of all possible mentors.
  app.get('/api/mentors', function (req, res) {
    res.json(mentorData);
  });

  // A POST routes /api/mentors. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/mentor', function (req, res) {

    // Parse new mentor input to get integers (AJAX post seemed to make the numbers strings)
    var newMentor = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newMentor.scores = scoresArray;


    // Cross check the new mentor entry with the existing ones
    var scoreComparisionArray = [];
    for(var i=0; i < mentorData.length; i++){

      // Check each mentor's scores and sum difference in points
      var currentComparison = 0;
      for(var j=0; j < newMentor.scores.length; j++){
        currentComparison += Math.abs( newMentor.scores[j] - MentorData[i].scores[j] );
      }

      // Push each comparison between mentors to array
      scoreComparisionArray.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the MentorData array
    var bestMatchPosition = 0; // assume its the first person to start
    for(var i=1; i < scoreComparisionArray.length; i++){

      // Lower number in comparison difference means better match
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the mentorData array is chosen
    var bestMentorMatch = mentorData[bestMatchPosition];



    // Reply with a JSON object of the best match
    res.json(bestMentorMatch);



    // Push the new friend to the friends data array for storage
    mentorData.push(newMentor);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;