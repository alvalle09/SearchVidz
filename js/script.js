
// Searchbar Handler
$(function() {
    var searchField = $('#query');
    var icon = $('#search-btn');

    // Focus Event Handler
    $(searchField).on('focus', function() {
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400);
    });

    // Blur Event Handler
    $(searchField).on('blur', function(){
        if(searchField.val() == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function() {});
            $(icon).animate({
                right: '360px'
            }, 400, function() {});
        }
    });

    // Keeps form from submitting data 
    $('#search-form').submit(function(e) {
       e.preventDefault();
    });
});

function search() {
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',   //what parts we're getting from the api
            q: q,
            type: 'video',
            key: 'AIzaSyCHwQ-xgu7t778ZMJ5gLjzfKbdrgmfxlMo' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);    

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    // Display Results
                    $('#results').append(output);

                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
   );
}

function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');


    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',   //what parts we're getting from the api
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCHwQ-xgu7t778ZMJ5gLjzfKbdrgmfxlMo' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);    

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    // Display Results
                    $('#results').append(output);

                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
   );
}

function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');


    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',   //what parts we're getting from the api
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyCHwQ-xgu7t778ZMJ5gLjzfKbdrgmfxlMo' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);    

                $.each(data.items, function(i, item) {
                    var output = getOutput(item);

                    // Display Results
                    $('#results').append(output);

                });

                var buttons = getButtons(prevPageToken, nextPageToken);

                // Display buttons
                $('#buttons').append(buttons);
            }
   );
}

// Build the butons
function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
            'onclick="nextPage();">Next Page</button></div>';
    } else {
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"'+
            'onclick="prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
            'onclick="nextPage();">Next Page</button></div>';    
    }

    return btnoutput;
}

// Build Output
function getOutput(item) {    
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description =  item.snippet.descripttion;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build Output String
    var output = '<li>' +
    '<div class = "list-left">' +
    '<img src="' +thumb+ '">' +
    '</div>' + 
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">"'+title+'</a></h3>' +  //channel Title class is added dynamically 
    '<small>By <span class="cTitle">' + channelTitle + '</span> on ' +videoDate+'</small>' +
    '<p>' + description +'</p>' +
    '</div>' +
    '<li>' +
    '<div class="clearfix"></div>' +
    '';
    return output;
}

