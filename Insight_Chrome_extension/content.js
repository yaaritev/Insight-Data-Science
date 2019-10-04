/*document.querySelectorAll('[id^=review-]')
var div = document.getElementby("DIV");
div.id = "someName";
div.appendChild(img);
document.body.appendChild(div);
*/



chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    if (request.message == "hi_there") {
      console.log('Made it in!')
      //var imgURL = chrome.runtime.getURL("images/myimage.png");
      //document.getElementById("someImage").src = imgURL;
      const div = document.getElementById("listing-14613773");
      const imgURL = chrome.extension.getURL('AirbnKids-48.png');
      const img = document.createElement("img");
      img.id = 'emojy';
      img.src = imgURL;
      div.appendChild(img);
    }
  }
)


chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    if (request.message == "hi_there") {
      console.log('Made it in here too!')
      let listings = document.querySelectorAll("[id^=listing-]");
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
                //console.log(data);
                var ReviewHTML = parser.parseFromString(data, "text/html");
                let summary = ReviewHTML.getElementById('details');
                console.log('This is a listing summary: ' + summary.textContent)
                let reviews = ReviewHTML.getElementById('reviews');
                console.log(reviews);
                let totalReviews = reviews.querySelectorAll('._s1tlw0m');
                //console.log(totalReviews);
                if (totalReviews.textContent === 'No reviews (yet)'){
                  console.log('No Reviews');
                } else{
                  let review = reviews.querySelectorAll('._czm8crp');
                  for(let k = 0; k < review.length; k++){
                  console.log("review - " + review[k].innerText)
                  chrome.runtime.sendMessage({message: "These are the reviews", reviewsPerListing: review[k].innerText});
                  }
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
