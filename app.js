// Sample js code for search.list

// See full sample for buildApiRequest() code, which is not
// specific to a particular API or API method.
const API_KEY = 'AIzaSyDi8P6Mcr_qrUcgI8tQBrR-4B-3IY_ewZc'
const URL = 'https://www.googleapis.com/youtube/v3/search';


// // buildApiRequest('GET',
// //                 URL,
// //                 {'maxResults': '10',
// //                  'part': 'snippet',
// //                  'key': API_KEY,
// //                  'q': '',
// //                  'type': ''});
//
function getDataFromApi(searchTerm, callback){
  console.log(callback);
  const query = {
    url: URL,
    data: {
      maxResults:"5",
      part: 'snippet',
      key: API_KEY,
      q: `${searchTerm} in:name`
    },
    dataTyape: 'json',
    type: 'Get',
    success: callback

  };

  $.ajax(query);
}

function renderResult(result) {
 console.log(result.snippet.thumbnails)
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
      </h2>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.default.url}"></a>
    </div>
  `;
}
function displayYouTubeData(data) {
  const searchResults = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(searchResults);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
  console.log("worked");
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("")
    getDataFromApi(query, displayYouTubeData);
  });
}
$(watchSubmit);
