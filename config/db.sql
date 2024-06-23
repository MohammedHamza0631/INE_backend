-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Create Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    cover TEXT NOT NULL,
    tags TEXT[]
);

-- Create Lessons Table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    video_id VARCHAR(255) NOT NULL,
    text_content TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Create Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Insert sample values into Users Table
INSERT INTO users (username, password, email) VALUES
('john_doe', 'password123', 'john@example.com'),
('jane_doe', 'password456', 'jane@example.com');

-- Insert sample values into Courses Table
INSERT INTO courses (title, summary, cover, tags) VALUES
('React Basics', 'A course on the basics of React.', 'cover1.jpg', ARRAY['React', 'Frontend']),
('Next.js Guide', 'Learn Next.js from scratch.', 'cover2.jpg', ARRAY['Next.js', 'Framework']),
('PostgreSQL Mastery', 'Master PostgreSQL for database management.', 'cover3.jpg', ARRAY['PostgreSQL', 'Database']);

-- Insert sample values into Lessons Table
INSERT INTO lessons (course_id, title, video_id, text_content) VALUES
(1, 'Introduction to React', 'gkbu1d9uh0pyruh4gtcj', 'This lesson covers the basics of React.'),
(1, 'React Components', 'xwbtnh5saghwuivf9ugu', 'This lesson covers React components.'),
(2, 'Introduction to Next.js', 'hkyminyhurizjjx6hsl9', 'This lesson covers the basics of Next.js.'),
(2, 'Next.js Routing', 'wxycso0tjonzsp1b6e11', 'This lesson covers routing in Next.js.'),
(3, 'Introduction to PostgreSQL', 'eo6zrwhbxfrffccd1qi0', 'This lesson covers the basics of PostgreSQL.'),
(3, 'PostgreSQL Advanced Queries', 'c90tguxkesikdewbjaji', 'This lesson covers advanced queries in PostgreSQL.');

-- Insert sample values into Enrollments Table
INSERT INTO enrollments (user_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 3);
