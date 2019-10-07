chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning  red!');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id,{"message":"hi_there"});
})
});

//list_reviews_perList = list();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
if(request.message == "These are the reviews"){
  console.log('Got the reviews');
  //listingId = request.listing_id;
  listingReviews =  request.reviewsPerListing;

  console.log(listingReviews)
  const url = "http://localhost:5000"
  //Send a big dictionary with all reviews per key listing.
  //listingsRev = {"listings": listingReviews}

  fetch( url, {
              mode: 'cors',
              method: 'post',
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body:   JSON.stringify(listingReviews)
            })
            .then(function(response) {
                        if (!response.ok) throw response;
                        else return response.text();
                        })
                        .then(function(text) {
                            if(text) {
                                console.log(JSON.parse(text));
                                chrome.runtime.sendMessage({"message": "got_label", "labelKidFriendly": text, "listingID": request.reviewsPerListing['id']})
                            }
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
  }
})



// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "http://ElasticIPaddr"
//
// fetch(proxyurl + url, {
//             mode: 'cors',
//             method: 'post',
//             headers: { "Content-type": "application/json; charset=UTF-8" },
//             body: JSON.stringify(request.eventDetails)
//         })


/**
 * Possible parameters for request:
 *  action: "xhttp" for a cross-origin HTTP request
 *  method: Default "GET"
 *  url   : required, but not validated
 *  data  : data to send in a POST request
 *
 * The callback function is called upon completion of the request */

//*chrome.runtime.onMessage.addListener(function(request, sender, callback) {
//    if (request.action == "xhttp") {
  //      var xhttp = new XMLHttpRequest();
    //    var method = request.method ? request.method.toUpperCase() : 'GET';

//        xhttp.onload = function() {
  //          callback(xhttp.responseText);
    //    };
      //  xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
        //    callback();
    //    };
      //  xhttp.open(method, request.url, true);
        //if (method == 'POST') {
          //  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//        }
  //      xhttp.send(request.data);
    //    return true; // prevents the callback from being called too early on return
  //  }
//});
