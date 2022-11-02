CREATE DATABASE todolist

DROP TABLE IF EXISTS users 

CREATE TABLE users (
  	id serial PRIMARY KEY, 
  	name text NOT NULL, 
  	email text NOT NULL UNIQUE,
  	password text NOT NULL		
)

DROP TABLE IF EXISTS todo 

CREATE TABLE todo (
  	id serial PRIMARY KEY, 
  	description text NOT NULL,
	date timestamp DEFAULT NOW(),	
    user_id int NOT NULL REFERENCES users(id) 
)
