CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  gender gender_enum NOT NULL,
  is_verified BOOLEAN NOT NULL
);

CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  user_id INTEGER NOT NULL REFERENCES users(id),
  locations JSONB
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  colors TEXT[],
  image_urls TEXT[],
  tags TEXT[]
  in_stock BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE wishlisted_products (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  size VARCHAR(50),
  color VARCHAR(50),
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, product_id)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_color VARCHAR(50) NOT NULL,
  completion_code VARCHAR(255) NOT NULL
);

CREATE TABLE ratings_and_comments (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id),
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  rating SMALLINT CHECK (rating >= 0 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);