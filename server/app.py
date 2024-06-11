from dbFunctions import *
from flask import Flask, request
from flask_cors import CORS

# instance of flask application
app = Flask(__name__)

# CORS setup
CORS(app)

# create a new recipe
@app.route("/create", methods=['POST'])
def create_recipe():
    print('create new recipe')
    req_data = request.get_json()
    print(req_data)
    res = create_update_recipe(req_data, 'insert')
    return res

# get all
@app.route("/get_recipes")
def get_recipes():
    print('get recipes')
    res = get_edit_recipe('all')
    return res

# get filter data
@app.route("/get_filters")
def get_filters():
    print('get filters')
    res = get_filter_data()
    return res

# get recipe to edit
@app.route("/edit")
def edit_recipe():
    print('edit recipe')
    id = request.args.get('id')
    res = get_edit_recipe(id)
    return res

# update recipe
@app.route("/update", methods=['PUT'])
def update_recipe():
    print('update recipe')
    req_data = request.get_json()
    res = create_update_recipe(req_data, 'update')
    return res

if __name__ == '__main__': 
    app.run()