$.ajax({ url: "https://api.mongolab.com/api/1/databases/comp2910/collections/leaderboard?f={%27_id%27:0}&f={%27username%27:1,%27score%27:1}&q{%27score%27:{%27$exists%27:true}}&s={%27score%27:1}&l=10&apiKey=m62xZhBH7kLiSw-6xFKTS87LCi1QQ3lJ",
	type: "GET",
	contentType: "application/json",
	success: function(data) {
		var test = data;
		var tableRows = "<table id='leaderboardContainer'><tr><th>Name</th><th>Score</th>";
		for (var i = 0; i < test.length; i++) {
			var object = test[i];
			tableRows += "<tr><td>" + object.username + "</td><td>" + object.score + "</td></tr>";
		}
		tableRows += "<img src='images/leaderboard.png'></img></tr></table>";
		document.getElementById('leaderboardScroll').innerHTML = tableRows;
		
	}
});

function sendData() {
	var user = $("#userId").val();
	$.ajax({ url: "https://api.mongolab.com/api/1/databases/comp2910/collections/leaderboard?apiKey=m62xZhBH7kLiSw-6xFKTS87LCi1QQ3lJ",
		data: JSON.stringify({"username" : user, "score" : $("#timer").text()}),
		type: "POST",
		contentType: "application/json"
	});
    $('#winningScreen').hide();
	return false;
}