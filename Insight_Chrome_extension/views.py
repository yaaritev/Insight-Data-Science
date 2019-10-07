from app import flask_instance
from flask import Flask, request, jsonify, render_template, url_for
from joblib import load
#
# from flask import render_template
# from flask import request
# from flaskexample import app
from flask.model import airbnTots

@app.route('/', methods=['POST', 'GET'])
@app.route('/index',methods=['POST', 'GET'])
def index():
    if request.method == 'POST':

        data = request.get_json(force=True)
        print('I made it!*****')
        print(data)
        label = airbnTots(data)
        print(label)

    return label



      # return render_template("index.html",
      #  title = 'Home', user = { 'nickname': 'Miguel' },
      #  )
