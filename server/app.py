# import flast module
from os import environ

import psycopg2
from flask import Flask, Response
from flask_cors import CORS

# instance of flask application
app = Flask(__name__)

# CORS setup
CORS(app)

PG_USER=environ.get('PG_USER')
PG_PASSWORD=environ.get('PG_PASSWORD')
PG_DB=environ.get('PG_DB')
PG_HOST=environ.get('PG_HOST')


# db config
def db_connect():
    conn = psycopg2.connect(host=PG_HOST,
                            database=PG_DB,
                            user=PG_USER,
                            password=PG_PASSWORD)
    return conn

@app.route("/", methods=['POST'])
def test_insert():
    res = 'ok'
    try:
        conn = db_connect()
        cur = conn.cursor()
        print("Connected to PostgresDB")
        
        cur.execute("CALL clean_plate_club.recipe_insert(%s, %s, %s, %s, %s, %s, %s);", (
            'ec0ee629-8fd0-43ef-9a96-1180afd6a4a6',
            'arroz con pollo',
            'criollo',
            '1 hr',
            'pollo',
            'stovetop',
            '{"link": "www.wepa.com", "image": "www.image.com"}'
        )) 
        conn.commit()
        print('Stored Procedure called')
    
    except (Exception, psycopg2.DatabaseError) as error: 
        res = error
        print("Error on calling stored procedure", error) 
    finally:
        cur.close()
        conn.close()
        print("PostgreSQL connection is closed")
        
        # send error code when there's an exception
        if(res != 'ok'):
            response = Response()
            response.status_code = 503
            return response
            
        return res

# get all
@app.route("/get_recipes")
def get_recipes():
    conn = db_connect()
    cur = conn.cursor()
    cur.execute('select * from clean_plate_club.recipes')
    recipes = cur.fetchall()
    print(recipes)
    cur.close()
    conn.close()
    return recipes

# get recipe to edit
@app.route("/get_recipe")
def get_recipe():
	return "Hello, World!"

# create recipe
@app.route("/create", methods=['POST'])
def create_recipe():
	return "Hello, World!"

# update recipe
@app.route("/create", methods=['POST'])
def update_recipe():
	return "Hello, World!"

if __name__ == '__main__': 
    app.run(debug=True)