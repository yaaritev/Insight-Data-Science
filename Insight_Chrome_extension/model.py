# Import libraries
import pandas as pd
import numpy as np
# Import libraries for the model
from sklearn import ensemble
from sklearn.model_selection import train_test_split

#from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer #initiating VADER instance
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Define a function that gives a sentiment score to text
def print_sentiment_scores(sentence):
    snt = analyser.polarity_scores(sentence)  #Calling the polarity analyzer
    print("{:-<40} {}".format(sentence, str(snt)))

# Define a bag of words that with high probablity indicate a review by a parent to young kids.
words_of_kids= ['toddler','toddlers', 'infant', 'infants', '1 year old', '2 year old', '3 year old', '4 year old', '5 year old', 'young kids', 'small kids','kiddie','kiddos', 'kiddo', 'preschooler','kindergartner']

# Compute the sentiment score of the reviews for each listing on the page

analyser = SentimentIntensityAnalyzer()
def vader_score(listing): #put the name of an array of comments per listing
    i=0 #counter
    compValListing = [ ]  #empty list to hold our computed 'compound' VADER scores
    while (i<len(listing)): #listings = the key listing
    k = analyser.polarity_scores(listing.value)
    compval0.append(k['compound'])
    i = i+1
    #converting sentiment values to numpy for easier usage
    compValListing = np.array(compValListing)
    return compValListing
