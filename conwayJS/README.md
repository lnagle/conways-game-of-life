# Conway's Game of Life

A straightforward implementation of Conway's Game of Life. 

### To Run

This repo requires you to have Node/NPM installed. Once you do, clone the repo and navigate to its root directory. 

Run:
```
npm i
npm start
```

Without any additional input, this will start the game with an [R-pentomino](http://www.conwaylife.com/wiki/R-pentomino) near the center of the board. 

You can also run `npm start <seed>`. The seed must take the shape of an array of coordinate tuples (`[x, y]`). For example, the default seed is `[[51, 20], [52, 20], [50, 21], [51, 21], [51, 22]]`.

To end the game, press CTRL + C.

### Tests

As much as I love tests, this was more of an afternoon hack than anything else. As such, it does not have tests.


### Limitations

It's a good idea to maximize your terminal size. If the board cannot fit inside your viewport it will cause some interesting rendering issues. For more info: https://github.com/vadimdemedes/ink/issues/48
