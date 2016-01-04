/*
 * Copyright (c) 2013 Andrew Nguyen
 * Licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */
var map;
var geocoder;
var infoWindow;
var user;
var markers = [];
var timers = [];
var oms;

var lfm_api = new LastFM('76f8063f36f8c096b50940a8034381e8');

document.getElementById('usr_form').onsubmit = processUser;
setTab(document.getElementById('about_tab'),
        document.getElementById('about'));
setTab(document.getElementById('err_tab'),
        document.getElementById('err_list'));
setTab(document.getElementById('result_tab'),
        document.getElementById('artist_list'));

var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
geocoder = new google.maps.Geocoder();
map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
infoWindow = new google.maps.InfoWindow({
            maxWidth: 240
});
oms = new OverlappingMarkerSpiderfier(map, {keepSpiderfied: true, nearbyDistance: 1});
oms.addListener('click', function(marker, event) {
    infoWindow.setContent(marker.content);
    infoWindow.open(map, marker);
});

if (window.location.hash) {
    document.getElementById('usr_input').value = window.location.hash.substring(1);
    processUser();
}

function processUser() {
    clearState();
    user = document.getElementById('usr_input').value;
    lfm_api.get_top_artists(user, 'overall', 100, plotArtists);
    document.getElementById('result_tab').onclick();
    window.location.hash = user;
    return false;
}

function plotArtists(data) {
    if (data.error) {
        alert('That user does not exist.');
        return;
    }
    timedLoop(0, data.topartists.artist);
}

function timedLoop(i, artists) {
    if (i == artists.length) {
        return;
    }
    var artist = artists[i];
    lfm_api.get_artist_info(artist.name, artist.mbid,
            function(data) { plotArtist(data, i + 1, artist.playcount) });

    timers.push(setTimeout(function() {timedLoop(i+1, artists)}, 1000));
}

function plotArtist(data, rank, playcount) {
    if (!data.artist || !data.artist.bio ||
                    !data.artist.bio.placeformed) {
        if (data.artist) {
            error('Last.fm data error: ' +
                    getArtistLink(data.artist.name))
        }
        return;
    }
    var placeformed = data.artist.bio.placeformed;
    geocoder.geocode({'address': placeformed},
                    function(results, status) {
                        switch (status) {
                            case google.maps.GeocoderStatus.OK:
                                var img_url = data.artist.image[1]['#text'];
                                var popupTxt =
                                    (img_url ? "<img class='artist_img' src='"
                                        + img_url + "'/>" : '') +
                                    getArtistLink(data.artist.name) + '<br/>' +
                                    placeformed + '<br/>Plays: ' + playcount;
                                var sidebarTxt = rank + '. ' + data.artist.name;
                                placeMarker(results[0].geometry.location, popupTxt,
                                    sidebarTxt);
                                break;
                            case google.maps.GeocoderStatus.ZERO_RESULTS:
                                error("Unable to map: " + getArtistLink(data.artist.name));
                                break;
                            default:
                                error('Google Maps: ' + status);
                        }
                    });
}

function placeMarker(location, popupTxt, sidebarTxt) {
    var marker = new google.maps.Marker({
            map: map,
            position: location
    });
    marker.content = popupTxt;
    oms.addMarker(marker);
    markers.push(marker);

    // Add to sidebar
    var li = document.createElement('li');
    li.setAttribute('class', 'artist_item');
    li.innerHTML = sidebarTxt;
    google.maps.event.addDomListener(li, 'click', function() {
        // must trigger twice in case the first click only spiderfies the location
        google.maps.event.trigger(marker, 'click');
        google.maps.event.trigger(marker, 'click');
    });
    document.getElementById('artist_list').appendChild(li);
}

function error(s) {
    var li = document.createElement('li');
    li.innerHTML = s;
    document.getElementById('err_list').appendChild(li);
}

function getArtistLink(artist, text) {
    return "<a target='_blank' href='http://www.last.fm/music/" +
            encodeURIComponent(artist) +
            "'>" + (text ? text : artist) + "</a>";
}

function clearState() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
    oms.clearMarkers();

    for (var i = 0; i < timers.length; i++) {
        clearTimeout(timers[i]);
    }
    timers.length = 0

    document.getElementById('artist_list').innerHTML = '';
    document.getElementById('err_list').innerHTML = '';
}

function setTab(tab, tabContent) {
    tab.onclick = function() {
        var siblings = getSiblings(tab);
        for (var i = 0; i < siblings.length; i++) {
            addClass(siblings[i], 'inactive_tab');
        }
        removeClass(tab, 'inactive_tab');

        siblings = getSiblings(tabContent);
        for (var i = 0; i < siblings.length; i++) {
            addClass(siblings[i], 'hidden_list');
        }
        removeClass(tabContent, 'hidden_list');
    }
}
/*
* jQuery abstinance
*/
function getChildren(n, skipMe){
    var r = [];
    var elem = null;
    for ( ; n; n = n.nextSibling )
    if ( n.nodeType == 1 && n != skipMe)
        r.push( n );
    return r;
};

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}

function addClass(e, cls) {
    e.className += ' ' + cls;
}

function removeClass(e, cls) {
    var re = new RegExp('(\\s|^)' + cls, 'g');
    e.className = e.className.replace(re , '');
}