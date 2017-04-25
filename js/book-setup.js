function newBook(title, author, pgCount, publishDt, other) {
  this.title = title;
  this.author = author;
  this.pgCount = pgCount;
  this.publishDt = publishDt;
  this.other = other;
};

var library = function(){};

library.prototype.myBookArray = [];

//******************************************** set up method add books to array
library.prototype.addBook = function(myBook){
  // check syntax of input
  var bookValid = validateBookInfo(myBook);
  // increment through existing books and check for duplicates
  var isNewBook = true;
  var bookArrayLen = gLibrary.myBookArray.length;
      // console.log("bookArrayLen: ", bookArrayLen);
  if (bookArrayLen > 0) {    // perform search
        // console.log("bookArrayLen > 0: ", bookArrayLen);
      for(var i = 0; (i < bookArrayLen && isNewBook); i++){
        if (gLibrary.myBookArray[i].title == myBook.title) {
          isNewBook = false;
        };
      }
  };
  // if book isn't already there, insert data into new element
  if (isNewBook) {
    gLibrary.myBookArray[bookArrayLen] = myBook;
          // console.log("add new:", myBook.title);   // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  }
  else {
        // NOTE: Assumption is that book can only appear once??
          // console.log("Book already exists: ", myBook.title);    // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  };

};

//******************************************** Validate inputs prior to adding to array
validateBookInfo = function(myBook){
  // NOTE:  Use form validation when working with inputs from presentation layer  https://www.w3schools.com/js/js_validation_api.asp
  if ((typeof(myBook.title)=="string") | (typeof(myBook.title)=="number")) {
            // console.log("title ok")
    if (typeof(myBook.author) == "string") {
            // console.log("author ok")
      if (typeof(myBook.pgCount) == "number") {
            // console.log("pgCount ok")
        if (typeof(myBook.publishDt) == "number") {   // NOTE:  fix this for better date validation
            // console.log("publishDt ok")
            return true;
            // NOTE: no validation on any other stuff that might be passed in
        } else {console.log("Incorrect datatype: publishDt: "+ myBook.publishDt); }
      } else {console.log("Incorrect datatype: pgCount: "+ myBook.pgCount); }
    } else {console.log("Incorrect datatype: author: "+ myBook.author); }
  } else {console.log("Incorrect datatype: title: "+ myBook.title); }
  return false;
};

//******************************************** Remove book by title
library.prototype.removeBookByTitle = function(myTitle){
          // NOTE: Assumption is that book can only appear once??
  var bookInLibrary = true;  // assume book is in the library
  var bookRemoved = false;
  var bookArrayLen = gLibrary.myBookArray.length;
  console.log("Removal: prior to loop");
  console.log(gLibrary.myBookArray.length, gLibrary.myBookArray)
  for(var i = 0; (i < gLibrary.myBookArray.length && bookInLibrary); i++) {
    if (gLibrary.myBookArray[i].title == myTitle) {
      // console.log("Inside loop; Array size before removal: ", gLibrary.myBookArray.length);
      gLibrary.myBookArray.splice(i, 1);  // take it out and shift the other elements
        // console.log("Inside loop; Array size after removal: ", gLibrary.myBookArray.length);
      bookInLibrary = false;
      bookRemoved = true;
      console.log("    Removal: Found it at index: ",i);
    };
  }
  console.log("Removal: After loop:   ",gLibrary.myBookArray.length);
    console.log(gLibrary.myBookArray.length, gLibrary.myBookArray)
  if (bookRemoved) {
    console.log("Array size: ", gLibrary.myBookArray.length, "Book removed: ", myTitle);
  }
  else {
    console.log("Array size: ", gLibrary.myBookArray.length, "Book not found: ", myTitle);

  }

};



library.prototype.removeBookByAuthor = function(){};  //(authorName)
library.prototype.getRandomBook = function(){};  //()
    // math.random, math.float?   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

library.prototype.getBookByTitle = function(){}; //(title)
library.prototype.getBooksByAuthor = function(){};  //(authorName)
library.prototype.addBooks = function(){};  //(books)
library.prototype.getAuthors = function(){};  //()
library.prototype.getRandomAuthorName = function(){};  //()

//  put instances at bottom per Eric
var gLibrary = new library();   // global library
var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Fantasy");
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);
var book3 = new newBook( "The Lincoln Lawyer","Michael Connolly", 315, 2005);
var book4 = new newBook( "Seven Databases in Seven Weeks","Eric Redmond and Jim R. Wilson", 212, 2013);
var book5 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);   // test duplicate book
var book6 = new newBook( "The Masterharper of Pern","Anne McCaffrey", 212, 1998);

gLibrary.addBook(book1);
gLibrary.addBook(book2);
gLibrary.addBook(book3);
gLibrary.addBook(book4);
gLibrary.addBook(book5);
gLibrary.addBook(book6);

var remTitle = "The Bourne Identity";
gLibrary.removeBookByTitle(remTitle);

var remTitle = "Anne McCaffrey";
// gLibrary.removeBookByAuthor();


//88888888888888888888888888888  test block 8888888888888888888888888888888888888
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
//console.log(book1,book2,book3,book4);
