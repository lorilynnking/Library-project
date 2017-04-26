function newBook(title, author, pgCount, publishDt, other) {
  this.title = title;
  this.author = author;
  this.pgCount = pgCount;
  this.publishDt = publishDt;
  this.other = other;
};

var library = function(){};

library.prototype.myBookArray = [];

library.prototype.logArray = [];   // NOTE:  set up a log of events

//******************************************** Log messages to array
library.prototype.logMessage = function(message){
  console.log(message);
  // var logArrayLen = this.logArray.length;
  this.logArray[this.logArray.length] = message;
  return;
};

//******************************************** Log messages to array
library.prototype.printLog = function(){
  var logArrayLen = this.logArray.length;
  for (var i = 0; i < logArrayLen; i++) {
    console.log(i,logArray[i]);
  };
};

//******************************************** set up method add books to array
library.prototype.addBook = function(myBook){
  // First, check syntax of input
  var isNewBook = true;
  var bookValid = validateBookInfo(myBook);
  // increment through existing books and check for duplicates
  if (bookValid) {
    var bookArrayLen = this.myBookArray.length;
    if (bookArrayLen > 0) {    // we have existing books; perform search
      for(var i = 0; (i < bookArrayLen && isNewBook); i++){
        if ((this.myBookArray[i].title == myBook.title)
        && (this.myBookArray[i].author == myBook.author)) {
          isNewBook = false;
        };
      };
    };
  }
  else {   // something is wrong with the book
    isNewBook = false;
  };
  if (isNewBook) {          // if book isn't already there, insert data into new element
    this.myBookArray.push(myBook);
    this.logMessage(eval('"addBook: "+ myBook.title+" ("+myBook.author+")"'));
  }
  else {                    // already have a book with same title and author
    this.logMessage(eval('"addBook: ***ERROR*** Book already exists: "+myBook.title+" ("+myBook.author+")"'));
  };
  // console.log ("new book added? ",isNewBook,myBook);
  return isNewBook;
};

//******************************************** Validate inputs prior to adding to array   NOTE: might want to change this to not make it nested????
validateBookInfo = function(myBook){
  // NOTE:  Use form validation when working with inputs from presentation layer  https://www.w3schools.com/js/js_validation_api.asp
  if ((typeof(myBook.title)=="string") | (typeof(myBook.title)=="number")) {
    if (typeof(myBook.author) == "string") {
      if (typeof(myBook.pgCount) == "number") {
        if (typeof(myBook.publishDt) == "number") {   // NOTE:  fix this for better date validation
            return true;
            // NOTE: no validation on any other stuff that might be passed in
        }
        else { this.logMessage(eval('"validateBookInfo: ***ERROR*** Incorrect datatype: publishDt: "+ myBook.publishDt'));
        };
      }
      else { this.logMessage(eval('"validateBookInfo: ***ERROR*** Incorrect datatype: pgCount: "+ myBook.pgCount'));
      };
    }
    else { this.logMessage(eval('"validateBookInfo: ***ERROR*** Incorrect datatype: author: "+ myBook.author'));
    };
  }
  else { this.logMessage(eval('"validateBookInfo: ***ERROR*** Incorrect datatype: title: "+ myBook.title'));
  };
  return false;
};

//******************************************** Remove book by title
library.prototype.removeBookByTitle = function(myTitle){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myTitle ==  this.myBookArray[i].title) {
      // console.log("removing book ",i,this.myBookArray[i].title);
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
      this.logMessage(eval('"removeBookByTitle: "+removalCount +"  Books removed: "+myTitle'));
  }
  else {
      this.logMessage(eval('"removeBookByTitle: ***ERROR*** Book not found: "+myTitle'));
  };
  // console.log(booksRemoved);
  return booksRemoved;
};

//******************************************** Remove book by author
library.prototype.removeBookByAuthor = function(myAuthor){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myAuthor ==  this.myBookArray[i].author) {
      // console.log("removing book ",i,this.myBookArray[i].author);
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
      this.logMessage(eval('"removeBookByAuthor: "+removalCount +" Books by "+myAuthor+" removed"'));
  }
  else {
      this.logMessage(eval('"removeBookByAuthor: ***ERROR*** Books by "+myAuthor+" not found"'));
  };
  return booksRemoved;
};

//********************************************  Get random book
library.prototype.getRandomBook = function(){
  var bookArrayLen = this.myBookArray.length;    // get size of current array
  if (bookArrayLen > 0) {

    var randomIndex = Math.round(Math.random()*bookArrayLen);
      this.logMessage(eval('"GetRandomBook: "+randomIndex, this.myBookArray[randomIndex].title'));
    return this.myBookArray[randomIndex];
  }
  else {
      this.logMessage(eval('"GetRandomBook: ***ERROR*** No books!"'));
    return null;
  };
};

//******************************************** get list of books by title
library.prototype.getBookByTitle = function(queryString){
  var titleArray = [];
  var resultsCount = 0;
  var pos = 0;
  // console.log("level 1: looking for ",queryString);
  for (var i=0; i<this.myBookArray.length; i++) {
    pos = this.myBookArray[i].title.indexOf(queryString);
    // console.log("  level 2: i = "+i+", pos = "+pos+" pos>0? "+(pos>=0));
    if (pos >= 0) {
      // console.log("    level 3: i = "+i+", match, add to results array");
      titleArray[resultsCount] = this.myBookArray[i];
      resultsCount++;
    };
  };
  // console.log(resultsCount,titleArray);
  if (resultsCount>0) {
    this.logMessage(eval('"getBookByTitle: "+resultsCount+" matches found for "+queryString'));
  }
  else {
    this.logMessage(eval('"getBookByTitle: ***ERROR*** No matches found for "+queryString'));
  };
  return titleArray;
};

//******************************************** get list of books by author
library.prototype.getBooksByAuthor = function(queryString){
  var authorArray = [];
  var resultsCount = 0;
  var pos = 0;
  // console.log("level 1: looking for ",queryString);
  for (var i=0; i<this.myBookArray.length; i++) {
      pos = this.myBookArray[i].author.indexOf(queryString);
    // console.log("  level 2: i = "+i+", pos = "+pos+" pos>0? "+(pos>=0));
    if (pos >= 0) {
      // console.log("    level 3: i = "+i+", match, add to results array");
      authorArray[resultsCount] = this.myBookArray[i];
      resultsCount++;
    };
  };
  // console.log(resultsCount,authorArray);
  if (resultsCount>0) {
    this.logMessage(eval('"getBooksByAuthor: "+resultsCount+" matches found for "+queryString'));
  }
  else {
    this.logMessage(eval('"getBooksByAuthor: ***ERROR*** No matches found for "+queryString'));
  };
  return authorArray;
};

//******************************************** Add an array of books
library.prototype.addBooks = function(inputBookArray){
  var inputArrayLen = inputBookArray.length;
  var addCount = 0;
  for (var i = 0; (i < inputArrayLen); i++){
    if (this.addBook(inputBookArray[i])) {
      addCount++;
    };
  };
  this.logMessage(eval('"addBooks: "+addCount+" books added"'));

  return addCount;
};

//******************************************** get list of authors
library.prototype.getAuthors = function(){
  var authorArray = [];
  var bookArrayLen = this.myBookArray.length;
  var authorArraySize = 0;
  var lookForAuthor = -1;
  for (var i = 0; (i < bookArrayLen); i++){
    lookForAuthor = authorArray.indexOf(this.myBookArray[i].author);
    if (lookForAuthor==-1) {
        authorArray[authorArraySize] = this.myBookArray[i].author;
        authorArraySize++;
    };
  };
  this.logMessage(eval('"getAuthors: "+authorArraySize+" distinct authors: ", authorArray'));
  return authorArray;
};

//******************************************** Get random author
library.prototype.getRandomAuthorName = function(){
  var authArray = this.getAuthors();
  var authArrayLen = authArray.length;    // get size of current array
  if (authArrayLen > 0) {
    var randomIndex = Math.round(Math.random()*(authArrayLen-1));
    this.logMessage(eval('"getRandomAuthorName: "+randomIndex+" "+authArray[randomIndex]'));
    return authArray[randomIndex];
  }
  else {
    this.logMessage(eval('"GetRandomBook: ***ERROR*** No authors!"'));
    return null;
  };

};

//  put instances at bottom per Eric
var gLibrary = new library();   // global library
var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Fantasy");
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);
var book3 = new newBook( "The Lincoln Lawyer","Michael Connolly", 315, 2005);
var book4 = new newBook( "Seven Databases in Seven Weeks","Eric Redmond and Jim R. Wilson", 212, 2013);
var book5 = new newBook( "The Masterharper of Pern","Anne McCaffrey", 212, 1998);
var book6 = new newBook( "The Bourne Identity","Different Author", 256, 1981);   // test duplicate book
var book7 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);   // test duplicate book

var bookArray = [];
bookArray[0] = book1;
bookArray[1] = book2;
bookArray[2] = book3;
bookArray[3] = book4;
bookArray[4] = book5;
bookArray[5] = book6;
bookArray[6] = book7;

// gLibrary.addBook(book1);
// gLibrary.addBook(book2);
// gLibrary.addBook(book3);
// gLibrary.addBook(book4);
// gLibrary.addBook(book5);
// gLibrary.addBook(book6);
// gLibrary.addBook(book7);  //  this one should fail

// var result = gLibrary.getRandomBook();
// console.log(result);

// var result = gLibrary.addBooks(bookArray);
// console.log(result);

var remTitle1 = "The Bourne Identity";
var remTitle2 = "1984";  // this one should return "no book founc"
// gLibrary.removeBookByTitle(remTitle1);
// gLibrary.removeBookByTitle(remTitle2);

var remAuthor1 = "Anne McCaffrey";
var remAuthor2 = "George Orwell";  // this one should return "no book founc"
// gLibrary.removeBookByAuthor(remAuthor1);
// gLibrary.removeBookByAuthor(remAuthor2);


var findBook1 = "Seven";    // beginning string
var findBook2 = "Pern";    // ending string
var findBook3 = "Database";    // middle string
var findBook4 = "Bourne";    // multiple books
var findBook5 = "nomatch";    // no match
// gLibrary.getBookByTitle(findBook1);
// gLibrary.getBookByTitle(findBook2);
// gLibrary.getBookByTitle(findBook3);
// gLibrary.getBookByTitle(findBook4);
// gLibrary.getBookByTitle(findBook5);

var findAuthor1 = "Michael";    // beginning string
var findAuthor2 = "Ludlum";    // ending string
var findAuthor3 = "nne";    // middle string
var findAuthor4 = "Anne";    // multiple books
var findAuthor5 = "Orwell";    // no match
// gLibrary.getBooksByAuthor(findAuthor1);
// gLibrary.getBooksByAuthor(findAuthor2);
// gLibrary.getBooksByAuthor(findAuthor3);
// gLibrary.getBooksByAuthor(findAuthor4);
// gLibrary.getBooksByAuthor(findAuthor5);


// gLibrary.getAuthors();

// var result = gLibrary.getRandomAuthorName();
// console.log(result);

//88888888888888888888888888888  test block for validating fields  on addBook  8888888888888888888888888888888888888
// var bookInv1 = new newBook( true,true,true,true); // test title
// gLibrary.addBook(bookInv1);
// var bookInv2 = new newBook( "The White Dragon",true,true,true); // test author
// gLibrary.addBook(bookInv2);
// var bookInv3 = new newBook( "The White Dragon","Anne McCaffrey", true,true); // test pgCount
// gLibrary.addBook(bookInv3);
// var bookInv4 = new newBook( "The White Dragon","Anne McCaffrey", 365, true);// test publishDt
// gLibrary.addBook(bookInv4);
// var bookInv5 = new newBook( );  // test null args
// gLibrary.addBook(bookInv5);
// var bookInv6 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Borrowed from Teresa"); // test too many args
// gLibrary.addBook(bookInv6);
// var bookInv7 = new newBook( "The White Dragon");// test on1 arg
// gLibrary.addBook(bookInv7);
