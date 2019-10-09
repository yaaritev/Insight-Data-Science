// AirbnTots Chrome extension, Yaarit Even, e-mail: yaarite@gmail.com
// The background.js file passes the Airbnb data from the content file to the views.py file
// The background.js file passes the listing label from views back to content

chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning  red!');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id,{"message":"hi_there"});
})
});



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
if(request.message == "These are the reviews"){
  console.log('Got the reviews');
  //listingId = request.listing_id;
  listingReviews =  request.reviewsPerListing;

  console.log(listingReviews)
  //const url = "http://18.190.29.28"
  const url = "http://localhost:5000"
  const proxyurl = "https://cors-anywhere.herokuapp.com/";


  fetch(url, {
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
                              console.log('**************')
                                console.log(text);
                                console.log(request.reviewsPerListing['id']);
                                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                                  let activeTab = tabs[0];
                                chrome.tabs.sendMessage(activeTab.id, {"message": "got_label", labelKidFriendly: text, listingID: request.reviewsPerListing['id']})
                              })
                            }
                        })
                        .catch(function(err) {
                            console.error(`Fetch Error =\n`, err);
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
