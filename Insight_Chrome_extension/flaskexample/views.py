# AirbnTots Chrome extension, Yaarit Even, e-mail: yaarite@gmail.com

# The views.py file runs the model on the Airbnb data and returns the label to the background file.

from flask import Flask, request, jsonify, render_template, url_for
from flaskexample import app
from flaskexample.model import airbnTots

@app.route('/', methods=['POST', 'GET'])
@app.route('/index',methods=['POST', 'GET'])
def index():
    if request.method == 'POST':

        data = request.get_json(force=True)
        print('Hello views file')
        print(data)
        label = airbnTots(data)
        print(label)

    return label
