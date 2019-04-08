var request = require('request'); //access external module
var secrets = require('./secrets'); // "./" to access module files within the folder

    function getRepoContributors(repoOwner, repoName, cb) {
        var options = {
            url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
            headers: {
            'User-Agent': 'request',
            Authorization: 'token ' + secrets.GITHUB_TOKEN //Authorization: token YOUR_TOKEN_HERE --> in this format
          }
        };
        request(options, function(err, res, body) {
          //parse the JSON string into an object
          var obj = JSON.parse(body)
          //passes the object to the callback function
          cb(err, obj);
        });
    }

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    //iterate over the results and console log the value of each avatar_url 
    result.forEach(function(result) {
        var avatarURL = result.avatar_url;
        console.log("Avatar URL:", avatarURL);
    });
  });