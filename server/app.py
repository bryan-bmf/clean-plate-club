# import flast module
from os import environ

import psycopg2
from flask import Flask, Response, request
from flask_cors import CORS
from psycopg2.extras import Json

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

# create a new recipe
@app.route("/create", methods=['POST'])
def create_recipe():
    print('create new recipe')
    res = 'ok'
    req_data = request.get_json()
    try:
        conn = db_connect()
        cur = conn.cursor()
        print("Connected to PostgresDB")
        
        cur.execute("CALL clean_plate_club.recipe_insert(%s, %s, %s, %s, %s, %s, %s);", (
            req_data['id'],
            req_data['name'],
            req_data['cuisine'],
            req_data['time'],
            req_data['protein'],
            req_data['cooking_type'],
            Json(req_data['source'])    
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
            
        res = 'Recipe created'
        return res

# get all
@app.route("/get_recipes")
def get_recipes():
    print('get recipes')
    query = """ 
            select jsonb_agg(t)
	        from (
                select id, name, cuisine, time, protein, cooking_type, media, image, null as title, null as author, null as cover_image, null as page
                from clean_plate_club.recipes t1
                join clean_plate_club.media t2
                on t1.id = t2.recipe_id
                and t2.recipe_id is not null


                union

                select id, name, cuisine, time, protein, cooking_type, null as media, null as image, title, author, cover_image, page
                        from clean_plate_club.recipes t1
                        join clean_plate_club.books t2
                        on t1.id = t2.recipe_id
                        and t2.recipe_id is not null
                ) t
                        """
    try:
        conn = db_connect()
        cur = conn.cursor()
        cur.execute(query)
        recipes = cur.fetchall()
        print(recipes)
        res = recipes
        
    except (Exception, psycopg2.DatabaseError) as error: 
        res = 'error'
        print(error) 
        
    finally:
        cur.close()
        conn.close()
        print("PostgreSQL connection is closed")
        
        # send error code when there's an exception
        if(res == 'error'):
            response = Response()
            response.status_code = 503
            return response
            
        return res

# get recipe to edit
@app.route("/edit")
def edit_recipe():
    print('edit recipe')
    id = request.args.get('id')
    query = """ 
            select jsonb_agg(t)
	        from (
                select id, name, cuisine, time, protein, cooking_type, media, image, null as title, null as author, null as cover_image, null as page
                from clean_plate_club.recipes t1
                join clean_plate_club.media t2
                on t1.id = t2.recipe_id
                and t2.recipe_id is not null
                where id = '""" + id + """'

                union

                select id, name, cuisine, time, protein, cooking_type, null as media, null as image, title, author, cover_image, page
                from clean_plate_club.recipes t1
                join clean_plate_club.books t2
                on t1.id = t2.recipe_id
                and t2.recipe_id is not null
                where id = '""" + id + """'
                ) t
            """
    try:
        conn = db_connect()
        cur = conn.cursor()
        cur.execute(query)
        recipes = cur.fetchall()
        print(recipes)
        res = recipes
        
    except (Exception, psycopg2.DatabaseError) as error: 
        res = 'error'
        print(error) 
        
    finally:
        cur.close()
        conn.close()
        print("PostgreSQL connection is closed")
        
        # send error code when there's an exception
        if(res == 'error'):
            response = Response()
            response.status_code = 503
            return response
            
        return res

# update recipe
@app.route("/update", methods=['PUT'])
def update_recipe():
    print('update recipe')
    res = 'ok'
    req_data = request.get_json()
    try:
        conn = db_connect()
        cur = conn.cursor()
        print("Connected to PostgresDB")
        
        cur.execute("CALL clean_plate_club.recipe_update(%s, %s, %s, %s, %s, %s, %s);", (
            req_data['id'],
            req_data['name'],
            req_data['cuisine'],
            req_data['time'],
            req_data['protein'],
            req_data['cooking_type'],
            Json(req_data['source'])    
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
            
        res = 'Update successful'
        return res

if __name__ == '__main__': 
    app.run(debug=True)