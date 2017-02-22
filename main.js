// WORKS PERFECTLY. DO NOT DELETE THIS CODE

// var myData;
//
// $.ajax({
//   url: "https://api.genius.com/songs/378195" +
//     "?access_token=7gJdWpRvcg9BfR4yAiYYnBnHCzHekT-iUlDYeApvPko2rDLZp6teaza5PNQy0KvW",
//   data: myData,
//   type: "GET",
//   success: function(myData) {
//     console.log(myData.response)
//   }
// });
randInt = function(min, max) {
  var MAX_UINT32 = 0xFFFFFFFF;
  var range = max - min;

  if (!(range <= MAX_UINT32)) {
    throw new Error(
      "Range of " + range + " covering " + min + " to " + max + " is > " +
      MAX_UINT32 + ".");
  } else if (min === max) {
    return min;
  } else if (!(max > min)) {
    throw new Error("max (" + max + ") must be >= min (" + min + ").");
  }

  // We need to cut off values greater than this to avoid bias in distribution
  // over the range.
  var maxUnbiased = MAX_UINT32 - ((MAX_UINT32 + 1) % (range + 1));

  var rand;
  do {
    rand = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (rand > maxUnbiased);

  var offset = rand % (range + 1);
  return min + offset;
};


var myData;

var songid = randInt(1, 250000);

window.addEventListener("click", function() {
  location.reload();
});

$.ajax({
  url: "https://api.genius.com/songs/" + songid +
    "?access_token=*********",
  data: myData,
  type: "GET",
  error: function() {
    $("#song-title").text("Service Interrupted");
  },
  success: function(myData) {
    console.log(myData);
    console.log(myData.response.song.full_title);

    if (!myData) {
      $("#album-title").text("Service Interrupted")
    }

    if (!myData.response.song.media.length) {
      $("#song-media").css("display", "none");
    }

    if (myData.response.song.album) {
      $("#album-title").text(myData.response.song.album.name);
    }

    var backgroundUrl = "url(" + myData.response.song.song_art_image_url +
      ")";
    $("#song-title").text(myData.response.song.full_title);
    // $("#wrapper").css("background-image", backgroundUrl);

    for (var i = 0; i < myData.response.song.media.length; i++) {
      if (myData.response.song.media[i].provider === "youtube") {
        var youtubeLink = myData.response.song.media[i].url;
        var a = youtubeLink.substr(31);
        console.log(a);
        var youtubeEdited = "http://www.youtube.com/embed/" + a;
        console.log(youtubeEdited);
        var youtubeEmbed = '<iframe width="560" height="315" src="' +
          youtubeEdited +
          '?ecver=1" frameborder="0" allowfullscreen></iframe>';
        $("#song-media").html(youtubeEmbed);
      }
      if (myData.response.song.media[i].provider === "spotify") {
        // $("#song-media").html(myData.response.song.media[i].url);
      }
      // else {
      //   console.log("no youtube clip found")
      // }
    }
  }
});
