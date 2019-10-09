// AirbnTots Chrom extension, Yaarit Even, e-mail: yaarite@gmail.com
// The content.js file reads the data from the Airbnb website and sends it to the background.js file.
// The content.js file recieves the model result for each listing from the background.js file, and displayes the AirbnTots image
// on the Airbnb website, according to the model result.

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    if (request.message == "hi_there") {
      console.log('Hello content file')
      let listings = document.querySelectorAll("[id^=listing-]");
      //var list_listings = [];
      for(let j = 0; j < listings.length; j++){
           var urlListing = 'https://www.airbnb.com/rooms/' + listings[j].id.split("-")[1];
           console.log('These are all the listings on this page ' + urlListing)
           const proxyurl = "https://cors-anywhere.herokuapp.com/";
           parser = new DOMParser();
           const request = new XMLHttpRequest();
           request.onload = () => {
              if (request.status === 200) {
                console.log("Success");
                var data=request.responseText;
                var ReviewHTML = parser.parseFromString(data, "text/html");
                let summary = ReviewHTML.getElementById('details');
                console.log('This is a listing summary: ' + summary.innerText)
                let reviews = ReviewHTML.getElementById('reviews');
                let totalReviews = reviews.querySelectorAll('._s1tlw0m');
                // console.log(totalReviews);
                if (totalReviews.innerText === 'No reviews (yet)'){
                  console.log('No Reviews');
                } else{
                  let review = reviews.querySelectorAll('[data-review-id]');
                  var list_reviews = [];
                  for(let l = 0; l < review.length; l++){
                  console.log("review " + l + ": " + review[l].innerText)
                  list_reviews.push(review[l].innerText)
                //}
                //  let review = reviews.querySelectorAll('._czm8crp');
                  //for(let k = 0; k < review.length; k++){
                  //console.log("review - " + review[k].innerText)
                //  console.log(review.innerText)
                 //chrome.runtime.sendMessage({message: "These are the reviews", listing_id: listings[j].id.split("-")[1], reviewsPerListing: review[l].innerText});
                  }
                  var listing_char = {id: listings[j].id.split("-")[1], all_reviews: list_reviews, description: summary.innerText};
                  //list_listings.push(listing_char);
                  chrome.runtime.sendMessage({message: "These are the reviews", reviewsPerListing: listing_char});
                  //Send review.innerText to background
                }
                }
                }
        //  }
        request.open('GET', proxyurl + urlListing, true);
        request.send(null);
      }
      }
  }
)





chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    if (request.message == "got_label") {
     console.log('Got labels!')
      //var imgURL = chrome.runtime.getURL("images/myimage.png");
      //document.getElementById("someImage").src = imgURL;
        if (request.labelKidFriendly == '1') {
          const div = document.getElementById("listing-" + request.listingID);
          const imgURL = chrome.extension.getURL('AirbnTots_rec.png');
          const img = document.createElement("img");
          img.id = 'emojy';
          img.src = imgURL;
          div.appendChild(img);
    }
    }
  }
)
