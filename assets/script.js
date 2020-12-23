var listenKey = '4f3fcf91ea69455db9ab9bad6c285f61';
$(document).ready(function () {
  console.log('Hello world!');
  // /*
  // Comments go here.
  // Comments go here.
  // Comments go here.
  // Comments go here.
  // Comments go here.
  // Comments go here.
  // Comments go here.
  // */

  // Example usage of the two APIs.
  searchOpenLibrary({
    title: 'The Lord of the Rings',
    author: 'tolkein',
  }).then(function (response) {
    console.log(response);
    getBookInformation(response.docs[0].key).then(function (bookResponse) {
      console.log(bookResponse);
    });
  });

  listenApiSearch({
    q: 'the zodiac killer',
  }).then(function (response) {
    console.log(response);
    listenApiGetPodcast(response.results[0].podcast.id).then(function (
      podResponse
    ) {
      console.log(podResponse);
    });
  });
});

/*
 * Expects an object in the form of
 *{
 *    title: "The Lord of the Rings",
 *    author: "Tolkein"
 *    person: "Zodiac Killer"
 *}
 *at least one property needs to exist for the query to perform properly.
 *
 */
function searchOpenLibrary(searchQuery) {
  var baseUrl = 'https://openlibrary.org/search.json';
  var queryUrl = baseUrl + '?';
  if (typeof searchQuery !== 'object') {
    return;
  }
  queryUrl += $.param(searchQuery);
  return $.ajax({
    url: queryUrl,
    method: 'GET',
  });
}

/*
 * Expects the bookKey taken from the result of a searchOpenLibrary call
 * if response is what is returned from searchOpenLibrary then you would pass
 * response.docs[i].key to this function to get detailed book information about the specific book,
 * where i is the index of the book to search for
 */
function getBookInformation(bookKey) {
  var baseUrl = 'https://openlibrary.org';
  var queryUrl = baseUrl + bookKey + '.json';
  return $.ajax({
    url: queryUrl,
    method: 'GET',
  });
}

/*
 * searchQuery should be an object with at least a q property and any of the optional parameters
 * specified by the API docs.
 * {
 *   q: 'my favorite murder'
 * }
 * returns the jQuery ajax promise
 */
function listenApiSearch(searchQuery) {
  if (typeof searchQuery !== 'object') {
    return;
  }
  var baseUrl = 'https://listen-api.listennotes.com/api/v2/search?';
  var queryUrl = (baseUrl += $.param(searchQuery));
  return $.ajax({
    url: queryUrl,
    method: 'GET',
    headers: {
      'X-ListenAPI-Key': listenKey,
    },
  });
}

/*
 * Expects the ID of the podcast to get more information for.
 * Returns the jQuery ajax promise.
 */
function listenApiGetPodcast(podcastId) {
  if (podcastId === null || podcastId === undefined) {
    return;
  }
  var baseUrl = 'https://listen-api.listennotes.com/api/v2/podcasts/';
  var fullUrl = baseUrl + podcastId;
  return $.ajax({
    url: fullUrl,
    method: 'GET',
    headers: {
      'X-ListenAPI-Key': listenKey,
    },
  });
}
