BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE actors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    movie_id UUID NOT NULL,
    actor_id UUID NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors (id) ON DELETE CASCADE
    );

CREATE TABLE writers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE movie_writer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    movie_id UUID NOT NULL,
    writer_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
    FOREIGN KEY (writer_id) REFERENCES writers (id) ON DELETE CASCADE,
    UNIQUE (movie_id, writer_id)
    );

CREATE INDEX idx_role_movie_id ON roles (movie_id);
CREATE INDEX idx_role_actor_id ON roles (actor_id);
CREATE INDEX idx_movie_writer_movie_id ON "movie_writer" (movie_id);
CREATE INDEX idx_movie_writer_writer_id ON "movie_writer" (writer_id);



ALTER TABLE movies ADD COLUMN IF NOT EXISTS trailer_url TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS director TEXT;

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=d9MyW72ELq0&t=7s&ab_channel=Avatar',
  director = 'James Cameron'
WHERE title = 'Avatar: The Way of Water';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=osYpGSz_0i4&ab_channel=WarnerBros.',
  director = 'Bong Joon-ho'
WHERE title = 'Mickey 17';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=uYPbbksJxIg&ab_channel=UniversalPictures',
  director = 'Christopher Nolan'
WHERE title = 'Oppenheimer';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=zSWdZVtXT7E&ab_channel=WarnerBros.UK%26Ireland',
  director = 'Christopher Nolan'
WHERE title = 'Interstellar';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=ELeMaP8EPAA&ab_channel=SonyPicturesEntertainment',
  director = 'Quentin Tarantino'
WHERE title = 'Once Upon a Time... in Hollywood';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=naQr0uTrH_s&ab_channel=RottenTomatoesClassicTrailers',
  director = 'Gore Verbinski'
WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=wJO_vIDZn-I&ab_channel=WarnerBros.',
  director = 'Jared Hess'
WHERE title = 'Minecraft';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=1pHDWnXmK7Y&ab_channel=MarvelEntertainment',
  director = 'Julius Onah'
WHERE title = 'Captain America: Brave New World';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=vea9SdnRMyg&ab_channel=Netflix',
  director = 'Julian Farino'
WHERE title = 'The Union';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=4rgYUipGJNo&ab_channel=ParamountPictures',
  director = 'Ridley Scott'
WHERE title = 'Gladiator II';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=aMcmfonGWY4&ab_channel=AmazonMGMStudios',
  director = 'Zoë Kravitz'
WHERE title = 'Blink Twice';

UPDATE movies SET
  trailer_url = 'https://www.youtube.com/watch?v=6COmYeLsz4c&ab_channel=UniversalPictures',
  director = 'Jon M. Chu'
WHERE title = 'Wicked';

ALTER TABLE movies ALTER COLUMN trailer_url SET NOT NULL;
ALTER TABLE movies ALTER COLUMN director SET NOT NULL;

INSERT INTO actors (first_name, last_name) VALUES
    ('Sam', 'Worthington'),
    ('Zoe', 'Saldana'),
    ('Robert', 'Pattinson'),
    ('Steven', 'Yeun'),
    ('Cillian', 'Murphy'),
    ('Emily', 'Blunt'),
    ('Matthew', 'McConaughey'),
    ('Anne', 'Hathaway'),
    ('Leonardo', 'DiCaprio'),
    ('Brad', 'Pitt'),
    ('Johnny', 'Depp'),
    ('Keira', 'Knightley'),
    ('Jason', 'Momoa'),
    ('Jack', 'Black'),
    ('Anthony', 'Mackie'),
    ('Harrison', 'Ford'),
    ('Mark', 'Wahlberg'),
    ('Halle', 'Berry'),
    ('Paul', 'Mescal'),
    ('Denzel', 'Washington'),
    ('Channing', 'Tatum'),
    ('Naomi', 'Ackie'),
    ('Cynthia', 'Erivo'),
    ('Ariana', 'Grande'),
    ('Kate', 'Winslet'),
    ('Giovanni', 'Ribisi'),
    ('Stephen', 'Lang'),
    ('Cliff', 'Curtis'),
    ('Naomi', 'Scott'),
    ('Daniel', 'Kaluuya'),
    ('Pom', 'Klementieff'),
    ('Benedict', 'Wong'),
    ('Matt', 'Damon'),
    ('Gary', 'Oldman'),
    ('Florence', 'Pugh'),
    ('Josh', 'Hartnett'),
    ('Jessica', 'Chastain'),
    ('Michael', 'Caine'),
    ('Casey', 'Affleck'),
    ('Topher', 'Grace'),
    ('Al', 'Pacino'),
    ('Dakota', 'Fanning'),
    ('Timothy', 'Olyphant'),
    ('Luke', 'Perry'),
    ('Geoffrey', 'Rush'),
    ('Orlando', 'Bloom'),
    ('Jonathan', 'Pryce'),
    ('Lee', 'Arenberg'),
    ('Emma', 'Stone'),
    ('Finn', 'Wolfhard'),
    ('David', 'Harbour'),
    ('Millie', 'Bobby Brown'),
    ('Liv', 'Tyler'),
    ('Tim', 'Blake Nelson'),
    ('Sebastian', 'Stan'),
    ('Shira', 'Haas'),
    ('Jessica', 'Alba'),
    ('Tom', 'Holland'),
    ('Vin', 'Diesel'),
    ('Eva', 'Mendes'),
    ('Pedro', 'Pascal'),
    ('Joseph', 'Quinn'),
    ('Barry', 'Keoghan'),
    ('Connie', 'Nielsen'),
    ('Sydney', 'Sweeney'),
    ('Chris', 'Pine'),
    ('Ayo', 'Edebiri'),
    ('Dakota', 'Johnson'),
    ('Jonathan', 'Bailey'),
    ('Michelle', 'Yeoh'),
    ('Jeff', 'Goldblum'),
    ('Bowen', 'Yang');


INSERT INTO writers (first_name, last_name) VALUES
    ('James', 'Cameron'),
    ('Rick', 'Jaffa'),
    ('Amanda', 'Silver'),
    ('Bong', 'Joon-ho'),
    ('Christopher', 'Nolan'),
    ('Emma', 'Thomas'),
    ('Quentin', 'Tarantino'),
    ('Ted', 'Elliott'),
    ('Terry', 'Rossio'),
    ('Allison', 'Schroeder'),
    ('Malcolm', 'Spellman'),
    ('Dalan', 'Musson'),
    ('Drew', 'Pearce'),
    ('Joe', 'Shrapnel'),
    ('David', 'Scarpa'),
    ('E.T.', 'Feigenbaum'),
    ('Winnie', 'Holzman'),
    ('Gregory', 'Maguire');

WITH movie_ids AS (
    SELECT id, title FROM movies
),
     writer_ids AS (
         SELECT id, first_name, last_name FROM writers
     )

INSERT INTO movie_writer (movie_id, writer_id)
SELECT
    m.id,
    w.id
FROM
    movie_ids m,
    writer_ids w
WHERE
    (m.title = 'Avatar: The Way of Water' AND (
        (w.first_name = 'James' AND w.last_name = 'Cameron') OR
        (w.first_name = 'Rick' AND w.last_name = 'Jaffa') OR
        (w.first_name = 'Amanda' AND w.last_name = 'Silver')
        )) OR
    (m.title = 'Mickey 17' AND w.first_name = 'Bong' AND w.last_name = 'Joon-ho') OR
    (m.title = 'Oppenheimer' AND w.first_name = 'Christopher' AND w.last_name = 'Nolan') OR
    (m.title = 'Interstellar' AND w.first_name = 'Christopher' AND w.last_name = 'Nolan') OR
    (m.title = 'Interstellar' AND w.first_name = 'Emma' AND w.last_name = 'Thomas') OR
    (m.title = 'Once Upon a Time... in Hollywood' AND w.first_name = 'Quentin' AND w.last_name = 'Tarantino') OR
    (m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND w.first_name = 'Ted' AND w.last_name = 'Elliott') OR
    (m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND w.first_name = 'Terry' AND w.last_name = 'Rossio') OR
    (m.title = 'Minecraft' AND w.first_name = 'Allison' AND w.last_name = 'Schroeder') OR
    (m.title = 'Captain America: Brave New World' AND w.first_name = 'Malcolm' AND w.last_name = 'Spellman') OR
    (m.title = 'Captain America: Brave New World' AND w.first_name = 'Dalan' AND w.last_name = 'Musson') OR
    (m.title = 'The Union' AND w.first_name = 'Drew' AND w.last_name = 'Pearce') OR
    (m.title = 'The Union' AND w.first_name = 'Joe' AND w.last_name = 'Shrapnel') OR
    (m.title = 'Gladiator II' AND w.first_name = 'David' AND w.last_name = 'Scarpa') OR
    (m.title = 'Blink Twice' AND w.first_name = 'E.T.' AND w.last_name = 'Feigenbaum') OR
    (m.title = 'Wicked' AND w.first_name = 'Winnie' AND w.last_name = 'Holzman') OR
    (m.title = 'Wicked' AND w.first_name = 'Gregory' AND w.last_name = 'Maguire');



WITH movie_ids AS (
    SELECT id, title FROM movies
),
     actor_ids AS (
         SELECT id, first_name, last_name FROM actors
     )

INSERT INTO roles (movie_id, actor_id, name)
SELECT
    m.id,
    a.id,
    CASE
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Sam' AND a.last_name = 'Worthington' THEN 'Jake Sully'
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Zoe' AND a.last_name = 'Saldana' THEN 'Neytiri'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Robert' AND a.last_name = 'Pattinson' THEN 'Mickey Barnes'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Steven' AND a.last_name = 'Yeun' THEN 'Bong Character'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Cillian' AND a.last_name = 'Murphy' THEN 'J. Robert Oppenheimer'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Emily' AND a.last_name = 'Blunt' THEN 'Katherine Oppenheimer'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Matthew' AND a.last_name = 'McConaughey' THEN 'Joseph Cooper'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Anne' AND a.last_name = 'Hathaway' THEN 'Dr. Amelia Brand'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Leonardo' AND a.last_name = 'DiCaprio' THEN 'Rick Dalton'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Brad' AND a.last_name = 'Pitt' THEN 'Cliff Booth'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Johnny' AND a.last_name = 'Depp' THEN 'Captain Jack Sparrow'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Keira' AND a.last_name = 'Knightley' THEN 'Elizabeth Swann'
        WHEN m.title = 'Minecraft' AND a.first_name = 'Jason' AND a.last_name = 'Momoa' THEN 'Steve'
        WHEN m.title = 'Minecraft' AND a.first_name = 'Jack' AND a.last_name = 'Black' THEN 'Notch'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Anthony' AND a.last_name = 'Mackie' THEN 'Sam Wilson / Captain America'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Harrison' AND a.last_name = 'Ford' THEN 'Thaddeus Ross'
        WHEN m.title = 'The Union' AND a.first_name = 'Mark' AND a.last_name = 'Wahlberg' THEN 'Mike'
        WHEN m.title = 'The Union' AND a.first_name = 'Halle' AND a.last_name = 'Berry' THEN 'Roxanne'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Paul' AND a.last_name = 'Mescal' THEN 'Lucius'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Denzel' AND a.last_name = 'Washington' THEN 'Macrinus'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Channing' AND a.last_name = 'Tatum' THEN 'Slater King'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Naomi' AND a.last_name = 'Ackie' THEN 'Frida'
        WHEN m.title = 'Wicked' AND a.first_name = 'Cynthia' AND a.last_name = 'Erivo' THEN 'Elphaba'
        WHEN m.title = 'Wicked' AND a.first_name = 'Ariana' AND a.last_name = 'Grande' THEN 'Glinda'
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Kate' AND a.last_name = 'Winslet' THEN 'Ronal'
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Giovanni' AND a.last_name = 'Ribisi' THEN 'Parker Selfridge'
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Stephen' AND a.last_name = 'Lang' THEN 'Colonel Quaritch'
        WHEN m.title = 'Avatar: The Way of Water' AND a.first_name = 'Cliff' AND a.last_name = 'Curtis' THEN 'Tonowari'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Naomi' AND a.last_name = 'Ackie' THEN 'Elara'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Daniel' AND a.last_name = 'Henshall' THEN 'Commander Voss'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Pom' AND a.last_name = 'Klementieff' THEN 'Unity Drone'
        WHEN m.title = 'Mickey 17' AND a.first_name = 'Benedict' AND a.last_name = 'Wong' THEN 'Scientist Xi'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Matt' AND a.last_name = 'Damon' THEN 'Leslie Groves'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Gary' AND a.last_name = 'Oldman' THEN 'Lewis Strauss'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Florence' AND a.last_name = 'Pugh' THEN 'Jean Tatlock'
        WHEN m.title = 'Oppenheimer' AND a.first_name = 'Josh' AND a.last_name = 'Hartnett' THEN 'Ernest Lawrence'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Jessica' AND a.last_name = 'Chastain' THEN 'Murph'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Michael' AND a.last_name = 'Caine' THEN 'Professor Brand'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Casey' AND a.last_name = 'Affleck' THEN 'Tom Cooper'
        WHEN m.title = 'Interstellar' AND a.first_name = 'Topher' AND a.last_name = 'Grace' THEN 'Getty'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Al' AND a.last_name = 'Pacino' THEN 'Marvin Schwarz'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Dakota' AND a.last_name = 'Fanning' THEN 'Squeaky Fromme'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Timothy' AND a.last_name = 'Olyphant' THEN 'Jim Stacy'
        WHEN m.title = 'Once Upon a Time... in Hollywood' AND a.first_name = 'Luke' AND a.last_name = 'Perry' THEN 'Wayne Maunder'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Geoffrey' AND a.last_name = 'Rush' THEN 'Barbossa'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Orlando' AND a.last_name = 'Bloom' THEN 'Will Turner'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Jonathan' AND a.last_name = 'Pryce' THEN 'Governor Swann'
        WHEN m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.first_name = 'Lee' AND a.last_name = 'Arenberg' THEN 'Pintel'
        WHEN m.title = 'Minecraft' AND a.first_name = 'Emma' AND a.last_name = 'Myers' THEN 'Redstone Engineer'
        WHEN m.title = 'Minecraft' AND a.first_name = 'Finn' AND a.last_name = 'Wolfhard' THEN 'Village Kid'
        WHEN m.title = 'Minecraft' AND a.first_name = 'David' AND a.last_name = 'Thewlis' THEN 'Iron Golem'
        WHEN m.title = 'Minecraft' AND a.first_name = 'Millie' AND a.last_name = 'Bobby Brown' THEN 'Explorer'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Liv' AND a.last_name = 'Tyler' THEN 'Betty Ross'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Tim' AND a.last_name = 'Blake Nelson' THEN 'Samuel Sterns'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Sebastian' AND a.last_name = 'Stan' THEN 'Bucky Barnes'
        WHEN m.title = 'Captain America: Brave New World' AND a.first_name = 'Shira' AND a.last_name = 'Haas' THEN 'Sabra'
        WHEN m.title = 'The Union' AND a.first_name = 'Jessica' AND a.last_name = 'De Gouw' THEN 'Agent X'
        WHEN m.title = 'The Union' AND a.first_name = 'Tom' AND a.last_name = 'Hopper' THEN 'Rookie Cop'
        WHEN m.title = 'The Union' AND a.first_name = 'Vin' AND a.last_name = 'Diesel' THEN 'The Driver'
        WHEN m.title = 'The Union' AND a.first_name = 'Eva' AND a.last_name = 'Green' THEN 'Rival Spy'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Pedro' AND a.last_name = 'Pascal' THEN 'General Decimus'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Joseph' AND a.last_name = 'Quinn' THEN 'Young Soldier'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Barry' AND a.last_name = 'Keoghan' THEN 'Emperor Geta'
        WHEN m.title = 'Gladiator II' AND a.first_name = 'Connie' AND a.last_name = 'Nielsen' THEN 'Lucilla'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Sydney' AND a.last_name = 'Sweeney' THEN 'Isla'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Chris' AND a.last_name = 'Messina' THEN 'The Influencer'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Ayo' AND a.last_name = 'Edebiri' THEN 'Jade'
        WHEN m.title = 'Blink Twice' AND a.first_name = 'Dakota' AND a.last_name = 'Johnson' THEN 'Lana'
        WHEN m.title = 'Wicked' AND a.first_name = 'Jonathan' AND a.last_name = 'Bailey' THEN 'Fiyero'
        WHEN m.title = 'Wicked' AND a.first_name = 'Michelle' AND a.last_name = 'Yeoh' THEN 'Madame Morrible'
        WHEN m.title = 'Wicked' AND a.first_name = 'Jeff' AND a.last_name = 'Goldblum' THEN 'The Wizard'
        WHEN m.title = 'Wicked' AND a.first_name = 'Bowen' AND a.last_name = 'Yang' THEN 'Boq'
        END
FROM
    movie_ids m,
    actor_ids a
WHERE
    TRUE
  AND (
    (m.title = 'Avatar: The Way of Water' AND a.last_name IN ('Worthington','Saldana','Winslet','Ribisi','Lang','Curtis'))
        OR (m.title = 'Mickey 17' AND a.last_name IN ('Pattinson','Yeun','Ackie','Henshall','Klementieff','Wong'))
        OR (m.title = 'Oppenheimer' AND a.last_name IN ('Murphy','Blunt','Damon','Oldman','Pugh','Hartnett'))
        OR (m.title = 'Interstellar' AND a.last_name IN ('McConaughey','Hathaway','Chastain','Caine','Affleck','Grace'))
        OR (m.title = 'Once Upon a Time... in Hollywood' AND a.last_name IN ('DiCaprio','Pitt','Pacino','Fanning','Olyphant','Perry'))
        OR (m.title = 'Pirates of the Caribbean: The Curse of the Black Pearl' AND a.last_name IN ('Depp','Knightley','Rush','Bloom','Pryce','Arenberg'))
        OR (m.title = 'Minecraft' AND a.last_name IN ('Momoa','Black','Myers','Wolfhard','Thewlis','Bobby Brown'))
        OR (m.title = 'Captain America: Brave New World' AND a.last_name IN ('Mackie','Ford','Tyler','Blake Nelson','Stan','Haas'))
        OR (m.title = 'The Union' AND a.last_name IN ('Wahlberg','Berry','De Gouw','Hopper','Diesel','Green'))
        OR (m.title = 'Gladiator II' AND a.last_name IN ('Mescal','Washington','Pascal','Quinn','Keoghan','Nielsen'))
        OR (m.title = 'Blink Twice' AND a.last_name IN ('Tatum','Ackie','Sweeney','Messina','Edebiri','Johnson'))
        OR (m.title = 'Wicked' AND a.last_name IN ('Erivo','Grande','Bailey','Yeoh','Goldblum','Yang'))
    );



INSERT INTO movie_photos (url, is_cover_image, movie_id)
VALUES
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Avatar/4pNlHx6ytdYBDs94PgcS0wQkbc4.jpg', false,
     (SELECT id FROM movies WHERE title = 'Avatar: The Way of Water')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Avatar/rZAUAePCueGzTdDzRQe9wD8x1Ov.jpg', false,
     (SELECT id FROM movies WHERE title = 'Avatar: The Way of Water')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Avatar/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg', false,
     (SELECT id FROM movies WHERE title = 'Avatar: The Way of Water')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Mickey17/2S3hRv6KqoZ3vReqlTVk1aHJIU6.jpg', false,
     (SELECT id FROM movies WHERE title = 'Mickey 17')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Mickey17/7Oh1xRB8QbMduhqXEUHKlnwxMJi.jpg', false,
     (SELECT id FROM movies WHERE title = 'Mickey 17')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Mickey17/cyDndCTSLg6GGVvDQLsaV4fXJzC.jpg', false,
     (SELECT id FROM movies WHERE title = 'Mickey 17')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Mickey17/qUc0Hol3eP74dbW4YyqT6oRLYgT.jpg', false,
     (SELECT id FROM movies WHERE title = 'Mickey 17')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Oppenheimer/8szKvTWhqnatqrHWloFyyPX1WZc.jpg', false,
     (SELECT id FROM movies WHERE title = 'Oppenheimer')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Oppenheimer/h0TuquPlfxqe4sJSy7sUlEzaAsL.jpg', false,
     (SELECT id FROM movies WHERE title = 'Oppenheimer')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Oppenheimer/kMa1TSDj76zTSleXE7xsuZ4s3i0.jpg', false,
     (SELECT id FROM movies WHERE title = 'Oppenheimer')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Oppenheimer/ycnO0cjsAROSGJKuMODgRtWsHQw.jpg', false,
     (SELECT id FROM movies WHERE title = 'Oppenheimer')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Interstellar/5C3RriLKkIAQtQMx85JLtu4rVI2.jpg', false,
     (SELECT id FROM movies WHERE title = 'Interstellar')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Interstellar/l33oR0mnvf20avWyIMxW02EtQxn.jpg', false,
     (SELECT id FROM movies WHERE title = 'Interstellar')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Interstellar/l38yk8r3RLzLYgFFvRYcOiDbvcq.jpg', false,
     (SELECT id FROM movies WHERE title = 'Interstellar')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Interstellar/ln2Gre4IYRhpjuGVybbtaF4CLo5.jpg', false,
     (SELECT id FROM movies WHERE title = 'Interstellar')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlackPearl/16FT0cxxBK9qQSvZf7F8i0ITQPm.jpg', false,
     (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlackPearl/dm0Q0RtV6U8pgM0mXvsNJpwRayP.jpg', false,
     (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlackPearl/nr6SuKESwEPZnExvxSzQczF1iBt.jpg', false,
     (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlackPearl/tDNHCZpTaLhVF7awv1PYgDkvHJU.jpg', false,
     (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/OnceUpon/ltUKAxoQ4GRu7EaUNg8GxD9vZ6u.jpg', false,
     (SELECT id FROM movies WHERE title = 'Once Upon a Time... in Hollywood')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/OnceUpon/nmsutFaFnlY1N85mPDt0r4fWynL.jpg', false,
     (SELECT id FROM movies WHERE title = 'Once Upon a Time... in Hollywood')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/OnceUpon/oRiUKwDpcqDdoLwPoA4FIRh3hqY.jpg', false,
     (SELECT id FROM movies WHERE title = 'Once Upon a Time... in Hollywood')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/OnceUpon/vm8C7lAob4hSn8MvHGa9RBLy7rR.jpg', false,
     (SELECT id FROM movies WHERE title = 'Once Upon a Time... in Hollywood')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Minecraft/4MWc9Ur80Wo0B1fVVTnV0CoSh6A.jpg', false,
     (SELECT id FROM movies WHERE title = 'Minecraft')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Minecraft/56lv8d5yst1SBhw1uR3iGFd1R43.jpg', false,
     (SELECT id FROM movies WHERE title = 'Minecraft')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Minecraft/lEkq2xPYtvEGx2iKkClN3p5uxFQ.jpg', false,
     (SELECT id FROM movies WHERE title = 'Minecraft')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Minecraft/ws2UKX5dtQlK6sJWbVaikCOJbxD.jpg', false,
     (SELECT id FROM movies WHERE title = 'Minecraft')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/CaptainAmericaBraveNewWorld/4ybBpFNwTQCbBewWrpO2YFNWRuB.jpg', false,
     (SELECT id FROM movies WHERE title = 'Captain America: Brave New World')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/CaptainAmericaBraveNewWorld/eJLTpgUAFkx165LuUoQqQGyN5Wp.jpg', false,
     (SELECT id FROM movies WHERE title = 'Captain America: Brave New World')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/CaptainAmericaBraveNewWorld/ncTtBRGnohOCMKfVuu3AfzaL1xE.jpg', false,
     (SELECT id FROM movies WHERE title = 'Captain America: Brave New World')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/CaptainAmericaBraveNewWorld/qfAfE5auxsuxhxPpnETRAyTP5ff.jpg', false,
     (SELECT id FROM movies WHERE title = 'Captain America: Brave New World')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/TheUnion/ADJon1zAvcParV7A1e6q6z0KVQ.jpg', false,
     (SELECT id FROM movies WHERE title = 'The Union')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/TheUnion/dqsWbl7aubfUn6OqmkmXPISj2W6.jpg', false,
     (SELECT id FROM movies WHERE title = 'The Union')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/TheUnion/mFhihsHSoyIqZbK7IgspWwq23ww.jpg', false,
     (SELECT id FROM movies WHERE title = 'The Union')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/TheUnion/vRHOXQhTrlWp0Hzr1b5Qn2Fa3bx.jpg', false,
     (SELECT id FROM movies WHERE title = 'The Union')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/GladiatorII/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg', false,
     (SELECT id FROM movies WHERE title = 'Gladiator II')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/GladiatorII/A4SDLzUM9RJVdQc3gWOX4epGLM7.jpg', false,
     (SELECT id FROM movies WHERE title = 'Gladiator II')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/GladiatorII/bHeUgZKqduubnNl8GshjrpHS9lF.jpg', false,
     (SELECT id FROM movies WHERE title = 'Gladiator II')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/GladiatorII/xGv28mcf8vdFttD0KgI5GnDDlkG.jpg', false,
     (SELECT id FROM movies WHERE title = 'Gladiator II')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlinkTwice/11xVvX1H7alRDfGHztA4lNvocDh.jpg', false,
     (SELECT id FROM movies WHERE title = 'Blink Twice')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlinkTwice/h6K9vwhbogdqXMxIpFpqKS9bEjQ.jpg', false,
     (SELECT id FROM movies WHERE title = 'Blink Twice')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlinkTwice/yUJpsoVT51seW9YG3jrRh9JS5S0.jpg', false,
     (SELECT id FROM movies WHERE title = 'Blink Twice')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/BlinkTwice/zQuOiqlktwgR64WW07PFWpjxWGs.jpg', false,
     (SELECT id FROM movies WHERE title = 'Blink Twice')),

    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Wicked/830sdPfXpyizgm05HR3LR6vFJrL.jpg', false,
     (SELECT id FROM movies WHERE title = 'Wicked')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Wicked/jTOeWjamUKGxWVUO1TMZXqQUarw.jpg', false,
     (SELECT id FROM movies WHERE title = 'Wicked')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Wicked/k4xavRmJUzf3M2LRDxhlPq8R6zy.jpg', false,
     (SELECT id FROM movies WHERE title = 'Wicked')),
    ('https://vsfcbekllchxbgylfrta.supabase.co/storage/v1/object/public/images/movies/Wicked/uDjYG4ODYetiNuRaopvLvRq0RuO.jpg', false,
     (SELECT id FROM movies WHERE title = 'Wicked'));

UPDATE movies
SET title = 'A Minecraft Movie'
WHERE title = 'Minecraft';

ALTER TABLE movie_photos
ALTER COLUMN is_cover_image SET DEFAULT FALSE;

COMMIT;
