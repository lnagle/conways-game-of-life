# Conway's Game of Life

An implementation of Conway's Game of Life using Node and PostgreSQL. 

### To Run

Install PostgreSQL: https://www.postgresql.org/docs/current/installation.html

Create a database named 'conway': https://www.guru99.com/postgresql-create-database.html

Install Node/NPM: https://nodejs.org/en/download/

In your terminal, clone this repo and navigate to its root directory. 

Run:
```
npm i
npm start
```

This will start the game with an [R-pentomino](http://www.conwaylife.com/wiki/R-pentomino) near the center of the board. Different starting configurations can be made by altering the /db/up file.

To end the game, press CTRL + C.

### Tests

As much as I love tests, this was more of an afternoon hack than anything else. As such, it does not have tests.


### Limitations

It's a good idea to maximize your terminal size. If the board cannot fit inside your viewport it will cause some interesting rendering issues. For more info: https://github.com/vadimdemedes/ink/issues/48
