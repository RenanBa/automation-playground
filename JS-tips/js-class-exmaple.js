// Create a class (parent class)
class Page {
  constructor(url) {
    this.url = url
  }

  // There is no need to use the function keyword inside a class
  open() {
    console.log(`Opening page at ${this.url}`)
  }
}

// const myPage = new Page('https://example.com')
// console.log(myPage.url)
// myPage.open()

// Create a subclass (child class) that extends the parent class
class ContactPage extends Page {
  constructor(url, title) {
    super(url)
    this.title = title || 'Contact Us'
  }

  open() {
    console.log(`Opening page ${this.url} with title of: "${this.title}".`)
  }

  // getter function: the get converts a method into a property
  // Advantage for this is that you can add a click login button action in this method and evoke the click action
  get loginBtn() {
    console.log(`<button>Login to ${this.title}</button>`)
  }
}

const contact = new ContactPage('https://example.com/contact')
contact.open()
// A getter method is accessed like a property and doesn't need the parenthesis
contact.loginBtn
// contact.loginBtn.click() // Example of adding a click action to the loginBtn getter method