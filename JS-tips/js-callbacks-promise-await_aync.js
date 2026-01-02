const request = require('native-request')

// PART 1
/**
 * This code demonstrates the use of callbacks and promises in JavaScript.
 * In this first part, we have a simple example without callbacks to show the order of asynchronous operations.
 * Observe that 'user4' is not printed because 'getUser' is called before 'createUser' finishes adding the new user.
 */
// console.log("start of asynchronous operations demonstration.")
// const users = ['user1', 'user2', 'user3']
// const getUser = () => {
//   setTimeout(() => {
//     users.forEach(user => {
//       console.log(user)
//     })
//   }, 1000)
// }

// const createUser = (newUser) => {
//   setTimeout(() => {
//     users.push(newUser)
//     console.log("End of asynchronous operations demonstration.")
//   }, 2000)
// }

// createUser('user4')
// getUser()


// ------------------------------------------------------------
// PART 2
/**
 * In this second part, we modify the 'createUser' function to accept a callback.
 * This ensures that 'getUser' is called only after 'createUser' has finished adding the new user.
 * Now, 'user4' will be printed as expected.
 */
// const users1 = ['user1', 'user2', 'user3']
// const getUser1 = () => {
//   setTimeout(() => {
//     users1.forEach(user => {
//       console.log(user)
//     })
//     console.log("End of synchronous operations demonstration.")
//   }, 1000)
// }

// const createUser1 = (newUser, callback) => {
//   setTimeout(() => {
//     console.log("Start of synchronous operations demonstration.")
//     users1.push(newUser)
//     callback()
//   }, 2000)
// }

// createUser1('user4', getUser1)

// ------------------------------------------------------------
// PART 3
/**
 * Now lets take a look at a callback on a fetch asynchronous operations.
 */


// const getTodos = () => {
//   // In this example, the (error, data) => { ... } function is a callback function that we are passing to the 'get' method.
//   request.get('https://jsonplaceholder.typicode.com/todos/1', (error, data) => {
//     console.log(data)
//     console.log("Fetching data completed.")
//     // do somehitng with data
//   })
// }

// getTodos()

// ------------------------------------------------------------
// PART 4
/**
 * In this part, we will use Promises to handle the asynchronous operation of fetching data from an API.
 * Promises provide a cleaner way to handle asynchronous code compared to callbacks.
 * A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
 * We will use the 'fetch' API which returns a Promise.
 * This allows us to use '.then()' to handle the response once the Promise is resolved.   
 */ 

// const getTodos = () => {
//   // In this example, we are using new Promise to create a Promise that wraps the asynchronous operation of fetching data.
//   return new Promise((resolve, reject) => {
//     request.get('https://jsonplaceholder.typicode.com/todos/1', (error, data) => {
//       if (error) reject(data)
//       resolve(data)
//     })
//   })
// }

// getTodos()
//   .then(response => console.log(response))
//   .catch(error => console.log('Error fetching data:', error))

// ------------------------------------------------------------
// PART 5
/**
 * In this example, we will use async/await syntax to handle Promises in a more synchronous-like manner.
 * The 'async' keyword is used to declare an asynchronous function, and 'await' is used to wait for a Promise to resolve.
 * This makes the code easier to read and maintain.
 */

// const getTodos = () => {
//   // In this example, we are using new Promise to create a Promise that wraps the asynchronous operation of fetching data.
//   return new Promise((resolve, reject) => {
//     request.get('https://jsonplaceholder.typicode.com/todos/1', (error, data) => {
//       if (error) reject(data)
//       resolve(data)
//     })
//   })
// }

// // In this function, we use 'await' instead of .then() inside of the async function to wait for the Promise to resolve.
// const getAPI = async () => {
//   const res = await getTodos()
//   console.log(res)
// }

// getAPI()


// ------------------------------------------------------------
// PART 6
/** Converting a fetch function into an async/await function */
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log('Error fetching data:', error))

/** The function above updated into async/await format below*/
const fetchData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await res.json()
  console.log(json)
}

fetchData()