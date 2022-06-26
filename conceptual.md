## Conceptual Exercise

Answer the following questions below:

### What are some ways of managing asynchronous code in JavaScript?
> -  Using callback functions and nesting requests inside of previous requests
> - Using AJAX http request library, chaining request callbacks with the .then method
> - Using the Promise class to aggregate chained .then requests, returning them 
> - Using the keyword async at the function declaration and await at the point of request

### What is a Promise?
> - A promise is an object introduced to javascript ES6 to alleviate the nesting of asynchronous callbacks  into one another.  
> - The foundation of a promise is an asynchronous callback function that returns the future value of the  function, either successfully (resolved) or unsuccessfully (rejected). This allows the rest of the code in the file to continue running synchronously, returning the function execution once it is completed. 
> - Theses promises are usually accepting http request, that take time and are uncertain as to when or what the response will be

### What are the differences between an async function and a regular function?
> - Async functions are only used in conjunction with asyncronous callbacks, such as http requests. They  suspend code execution until the callback function data is returned
> - Regular functions are executed right away. 

### What is the difference between Node.js and Express.js?
> - *`Node.js`* is a program that executes javascript files and can connect to a local host server, using packages like *Express.js*. It also has command line capabilities, that execute javascript files inside the terminal, by running a command with node as the first argument, it runs that script and returns output to the terminal or to the files in the terminal environment.
> - *`Express.js`* is a javascript package or library that is imported onto a file in order to create a server that is run on *node.js*

### What is the error-first callback pattern?
> The standard for executing callback functions in node.js is to pass an error object as the first parameter in the function, followed by the remaining data parameters that you are attempting to execute. The philosophy is that node will first check to see if there is an error in the code, returning an Error object if an error exists, and only returning the desired data values once it has been determined no error exists.

### What is middleware?
> - Middleware is any functions that are called using the Next() function contained in the previously executed function of a program, that run between the request-response cycle of a javascript web app server. 

### What does the `next` function do?
> - Since javascript programs run syncronously AND execution will stop at the conclusion of a function in node, the implementation of the next() function is necessary to continue the flow of program functions. A function passes next as one of its parameters and executes the Next() callback in the end of it's codeblock.

# What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
> 1) If there is an error responding to one of the requests, the function will return a rejected promise, and none of the request data will be returned. 
> 2)  
