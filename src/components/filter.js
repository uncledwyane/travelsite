export var formatArtist = function (artists){
    var artistNames = [];
    for (var i = 0; i < artists.length; i++) {
        artistNames.push(artists[i].name);
    }
    return artistNames.toString();
}