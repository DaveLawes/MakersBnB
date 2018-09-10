CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title TEXT,
  description TEXT,
  price INTEGER
);

-- Don't need to specify foreign key as our ORM deals with this.
