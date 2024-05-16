# import flast module
from flask import Flask
from flask_cors import CORS, cross_origin

# instance of flask application
app = Flask(__name__)

# CORS setup
CORS(app)

# home route that returns below text when root url is accessed
@app.route("/")
def hello_world():
	return "Hello, World!"

if __name__ == '__main__': 
    app.run()