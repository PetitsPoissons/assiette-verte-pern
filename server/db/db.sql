CREATE DATABASE assiette-verte-pern;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(50) NOT NULL,
  category VARCHAR(40) NOT NULL,
  prep_time VARCHAR(10),
  difficulty INT CHECK(difficulty >= 1 AND difficulty <= 5),
  prep_steps TEXT NOT NULL,
  ingredients TEXT NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  author VARCHAR(50) NOT NULL,
  recipe_id INT NOT NULL REFERENCES recipes(id),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  review TEXT,
  rating INT CHECK(rating >= 1 AND rating <= 5)
);