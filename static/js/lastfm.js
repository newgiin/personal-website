/**
 * lastfm.js
 * Last.fm authorization and scrobbling XHR requests
 * Copyright (c) 2011 Alexey Savartsov <asavartsov@gmail.com>
 * Licensed under the MIT license
 */

/**
 * LastFM class constructor
 *
 * @param api_key Last.fm API key
 * @param api_secret Last.fm API secret
 */
function LastFM(api_key, api_secret) {
    this.API_KEY = api_key || "";
    this.API_SECRET = api_secret || "";
    this.API_ROOT = "http://ws.audioscrobbler.com/2.0/";
}

LastFM.prototype.get_top_artists = function(user, period,
        limit, callback) {
    var params = {
        'api_key': this.API_KEY,
        'method': 'user.gettopartists',
        'user': user,
        'period': period,
        'limit': limit
    };
    
    params.format = "json";
    
    this._xhr("GET", params, 
        function(result) {
            callback(result);
        });      
}

LastFM.prototype.get_artist_info = function(artist, mbid, callback) {
    var params = {
        'api_key': this.API_KEY,
        'method': 'artist.getinfo',
        'artist': artist,
    };
    if (mbid) {
      params['mbid'] = mbid; 
    }
    
    params.format = "json";
    
    this._xhr("GET", params, 
        function(result) {
            callback(result);
        });      
}

/**
 * Performs an XMLHTTP request and expects JSON as reply
 *
 * @param method Request method (GET or POST)
 * @param params Hash with request values. All request fields will be
 *               automatically urlencoded
 * @param callback Callback function for the request. Sends a parameter with
 *                 reply decoded as JS object from JSON on null on error
 */
LastFM.prototype._xhr = function(method, params, callback) {
    var uri = this.API_ROOT;
    var _data = "";
    var _params = [];
    var xhr = new XMLHttpRequest();
    
    for(param in params) {
        _params.push(encodeURIComponent(param) + "="
            + encodeURIComponent(params[param]));
    }
    
    switch(method) {
        case "GET":
            uri += '?' + _params.join('&').replace(/%20/, '+');
            break;
        case "POST":
            _data = _params.join('&');
            break;
        default:
            return;
    }
    
    
    xhr.open(method, uri);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var reply;
            
            try {
                reply = JSON.parse(xhr.responseText);
            }
            catch (e) {
                reply = null;
            }
            
            callback(reply);
        }
    };

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(_data || null);
};
