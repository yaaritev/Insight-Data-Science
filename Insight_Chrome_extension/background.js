// AirbnTots Chrome extension, Yaarit Even, e-mail: yaarite@gmail.com

// The background.js file passes the Airbnb data from the content file to the views.py file
// The background.js file passes back the listing label from views.py to content.js

chrome.browserAction.onClicked.addListener(function(tab) {

  console.log('Turning  red!');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id,{"message":"hi_there"});
})
});



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
if(request.message == "These are the reviews"){     // Receiving the data from the content.js
  console.log('Got the reviews');
  //listingId = request.listing_id;
  listingReviews =  request.reviewsPerListing;

  console.log(listingReviews)

// To work on the localhost you only need to fetch the url
  const url = "http://localhost:5000"
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  // In order to connect to AWS you need to change the url to "http://18.190.29.28" and add the proxyurl in the fetch function.

  //const url = "http://18.190.29.28"
// fetch(proxyurl + url, {
  fetch(url, {                                   //Sending the Airbnb data the views.py
              mode: 'cors',
              method: 'post',
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body:   JSON.stringify(listingReviews)
            })
            .then(function(response) {                           //Receiving back the label from views.py
                        if (!response.ok) throw response;
                        else return response.text();
                        })
                        .then(function(text) {
                            if(text) {
                              console.log('**************')
                                console.log(text);
                                console.log(request.reviewsPerListing['id']);
                                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                                  let activeTab = tabs[0];
                                chrome.tabs.sendMessage(activeTab.id, {"message": "got_label", labelKidFriendly: text, listingID: request.reviewsPerListing['id']})
                              })  //Sent the label of each listing to content.js
                            }
                        })
                        .catch(function(err) {
                            console.error(`Fetch Error =\n`, err);
                        });
  }
})
