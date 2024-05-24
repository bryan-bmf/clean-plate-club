from os import environ

import psycopg2
import requests
from flask import Response
from psycopg2.extras import Json

PG_USER=environ.get('PG_USER')
PG_PASSWORD=environ.get('PG_PASSWORD')
PG_DB=environ.get('PG_DB')
PG_HOST=environ.get('PG_HOST')
API_KEY=environ.get('API_KEY')

# db config
def db_connect():
    conn = psycopg2.connect(host=PG_HOST,
                            database=PG_DB,
                            user=PG_USER,
                            password=PG_PASSWORD)
    return conn

# create or update recipe
def create_update_recipe(req_data, type):
    print(type + ' recipe')
    res = 'ok'
    
    try:
        
        # get book info if source type is book
        if(req_data['source_type'] == 'book'):
            print('book found')
            book = getGoogleBook(req_data['source'])
            print(book)
            req_data['source'] = {}
            req_data['source']['title'] = book['title']
            req_data['source']['author'] = book['author']
            req_data['source']['cover_image'] = book['cover_image']
            req_data['source']['page'] = int(req_data['page'])
            print(req_data)
            
        
        conn = db_connect()
        cur = conn.cursor()
        print("Connected to PostgresDB")
        
        cur.execute("CALL clean_plate_club.recipe_" + type + "(%s, %s, %s, %s, %s, %s, %s);", (
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
            response = Response(
                str(res),
                status = 503,
            )
            return response
            
        res = 'Recipe ' + type + "d"
        return res
    
# get all recipes or a single recipe to edit
def get_edit_recipe(id):
    print('get/edit recipe')
    try:
        res = 'ok'
        condition = ''
        if(id != 'all'):
            condition = "where id = '" + id + "'"
            
        query = """ 
                select jsonb_agg(t)
                from (
                    select id, name, cuisine, time, protein, cooking_type, link, image, null as title, null as author, null as cover_image, null as page
                    from clean_plate_club.recipes t1
                    join clean_plate_club.media t2
                    on t1.id = t2.recipe_id
                    and t2.recipe_id is not null
                    """ + condition + """

                    union

                    select id, name, cuisine, time, protein, cooking_type, null as link, null as image, title, author, cover_image, page
                    from clean_plate_club.recipes t1
                    join clean_plate_club.books t2
                    on t1.id = t2.recipe_id
                    and t2.recipe_id is not null
                    """ + condition + """
                    ) t
                """

        conn = db_connect()
        cur = conn.cursor()
        cur.execute(query)
        recipes = cur.fetchall()
        print(recipes)
        
    except (Exception, psycopg2.DatabaseError) as error: 
        res = error
        print('EXCEPTION', error)
                
    finally:
        cur.close()
        conn.close()
        print("PostgreSQL connection is closed")
        
        # send error code when there's an exception
        if(res != 'ok'):
            response = Response(
                str(res),
                status = 503
            )
            return response
            
        return recipes
    
def getGoogleBook(q):
    print('get book')
    url = "https://www.googleapis.com/books/v1/volumes"
    resp = requests.get(url + "?key=" + API_KEY + "&q=" + q)
    resp = resp.json()
    book = resp['items'][0]['volumeInfo']
    title = book['title']
    cover_image = book['imageLinks']['thumbnail']
    author =  book['authors'][0]
    return {"title": title, "cover_image": cover_image, "author": author}