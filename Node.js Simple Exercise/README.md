## Introduction to Node.js

Node.js is a JavaScript runtime that allows you to run JavaScript code on the server-side.

To test Node, open the command line a type `node`

Try these commands:

```
N:\ node
> var x = 10;
undefined
> var y = 20;
undefined
> x + y;
30
> .exit
```

We don't want to run JavaScript code in the console, we create a file named `script.js` and run it with Node

Put this code inside the file:

```
var x = 10;
var y = 20;
console.log(x + y);
```

Now navigate to the working directory and type `node script.js`, this should execute the code and output the console.
