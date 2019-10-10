# AirbnTots model, Yaarit Even, e-mail: yaarite@gmail.com
# Input: Airbnb listings' reviews
# Output: Binary score indicating if the listing is young kid-friendly (1 if yes, 0 if no)


def airbnTots(data):
    print("Hello model!")
#########################################################################################################################################
    # Import libraries
    import pandas as pd
    import numpy as np
    import pickle
    from sklearn import ensemble
    from sklearn.model_selection import train_test_split

    #from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer #initiating VADER instance
    import nltk
    from nltk.sentiment.vader import SentimentIntensityAnalyzer

    #########################################################################################################################################

    # Sentiment Analysis to the Airbnb listings' reviews
    # Define function to compute the sentiment score of all the reviews for each listing

    analyser = SentimentIntensityAnalyzer()
    def vader_score(allReviews): #put the name of an array of comments per listing
        i=0 #counter
        compValReview = [ ]  #empty list to hold our computed 'compound' VADER scores
        while (i<len(allReviews)):
                k = analyser.polarity_scores(allReviews[i])
                compValReview.append(k['compound'])
                i = i+1
        #converting sentiment values to numpy for easier usage
        compValReview = np.array(compValReview)
        return [compValReview.mean(), compValReview.min()]  #return the mean and minimum values of reviews vader score per listing

    #########################################################################################################################################

    #Identify parents reviews and check for their vader score.
    #Model 1 - If able to identify existense of parents reviews
    #If positive, return listing is kid-friendly
    #If negative, return listing is not kid-friendly)
    #Model 2 - If not able to identify existense of parent reviews
    # continue to the Random Forest model


    #list of specific strings indicating parents reviews
    parentWords = ['baby', 'babies','toddler','toddlers', 'infant', 'infants', '1 year old', '2 year old', '3 year old', '4 year old', '5 year old', 'young kids', 'small kids','kiddie','kiddos', 'kiddo', 'preschooler','kindergartner']
    #list of specific strings indicating non-parents reviews
    nonParentsWords = ["like a baby","like babies"]

    def comment_contain_words(comment, wordsToCheck):
        for word in wordsToCheck:
            if word in comment:
                return True
        return False

    listing_label = '5'
    reviews_labels = []

    for currentReview in data['all_reviews']:
        #if the review contains a parent word and doesn't contain a non-parent word
        if comment_contain_words(currentReview, parentWords) and not comment_contain_words(currentReview, nonParentsWords):
            if analyser.polarity_scores(currentReview)['compound'] > 0.25:
                #print('This is a positive parent review')
                #print('Listing ' + data.id + ' is kid-friendly')
                reviews_labels.append(2)
            else:
                #print('This is a negative parent review')
                #print('Listing ' + data.id + ' is NOT kid-friendly')
                reviews_labels.append(1)
        else:
            #print('not a parent review')
            reviews_labels.append(0)

    #If the list 'reviews_labels' contains values in {1,2} then there exists parent reviews and we are in the case of Model 1
    #Otherwise, 'reviews_labels' contains only zeros - no parent reviews - and we are in the case of Model 2
    #Thus, we now check for the values of 'reviews_labels'

    # pkl_filename = './flaskexample/AirbnTots_model.pkl'
    ## Opening the pickle model
    # with open(pkl_filename, 'rb') as file:
	#     pickle_airbnTots = pickle.load(file)
	#     print('I got the pickle!')



    if 1 in reviews_labels:
        listing_label = '0'
    elif 2 in reviews_labels:
        listing_label = '1'
    else:
        listing_data = vader_score(data['all_reviews'])
        if (listing_data[0].astype(float) > 0.25) &  (listing_data[0].astype(float) > 0.25):
        #if pickle_airbnTots.predict(listing_data) == 1:
            listing_label = '1'
        else:
            listing_label = '0'

    return listing_label
