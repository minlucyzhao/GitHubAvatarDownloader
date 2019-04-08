var request = require('request'); //access external module
var secrets = require('./secrets'); // "./" to access module files within the folder
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

  //main function that is called
  function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
      'User-Agent': 'request',
      //Authorization: token YOUR_TOKEN_HERE --> in this format
      Authorization: 'token ' + secrets.GITHUB_TOKEN 
      }
    };
    request(options, function(err, res, body) {
      //parse the JSON string into an object
      var obj = JSON.parse(body)
      //passes the object to the callback function
      cb(err, obj);
    });
  }

  //secondary function that is called 
function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}


//call getRepoContributors (with anonymous callback function) (owner and repo is part of the URL path)
getRepoContributors(owner, repo, function(err, result) {
  //If user does not specify both arguments, the program should not attempt a request
  if (owner === undefined || repo === undefined) {
    console.log("Error " + err + ": Please specify an owner and/or repo");
  }
  //iterate over the results and console log the value of each avatar_url 
  result.forEach(function(result) {
    var avatarURL = result.avatar_url;
    var filePath = "./avatars/ " + result.login + ".jpg";
    downloadImageByURL(avatarURL, filePath);
  });
});

//console.log('Welcome to the GitHub Avatar Downloader!');