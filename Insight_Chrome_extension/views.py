from flask import render_template
from flask import request
from flaskexample import app

@app.route('/', methods=['POST', 'GET'])
@app.route('/index',methods=['POST', 'GET'])
def index():
    if request.method == 'POST':

        data = request.get_json(force=True)
        print('I made it!*****')
        print(data)




    return render_template("index.html",
       title = 'Home', user = { 'nickname': 'Miguel' },
       )

#from model import AirbnTots
#function(data)
