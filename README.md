#weights

The original codebase of this repository was basically a fork of my `thinkster` repository, which itself closely follows [this tutorial] (https://thinkster.io/mean-stack-tutorial) on how to create a MEAN stack web application. Thus, the original codebase closely resembles the result of that tutorial.

My goal is to create something that I am intrinsically motivated to create, while leveraging what I learned from the aforementioned tutorial.

That being said, this web application is meant to act as a dashboard of my friends', my own, and guests' weight lifting numbers. The data should be persistent and easily editable. I hope to leverage `D3.js` for some silly visuals of our numbers, and perhaps implement a *dynamic programming* algorithm to aid in that regard.

Have fun poking around!

## Starting and Viewing the App

Once you have the repo on your machine, you can change directories (`cd`) into the repo, and then type and `enter` the following commands:
- `mongod` (This opens up the database or something like that)
- `npm start` (This will instruct `npm` to automatically find the entry point into our app).

The app should then be viewable in your browser by typing in and navigating to `localhost:3000`.
