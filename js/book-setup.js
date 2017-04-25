function newBook(title, author, pgCount, publishDt, other) {
  this.title = title;
  this.author = author;
  this.pgCount = pgCount;
  this.publishDt = publishDt;
  this.other = other;
};

var library = function(){};

library.prototype.myBookArray = [];
var logArray = [];   // NOTE:  set up a log of events

//******************************************** set up method add books to array
library.prototype.addBook = function(myBook){
  // check syntax of input
  var isNewBook = true;
  var bookValid = validateBookInfo(myBook);
  // increment through existing books and check for duplicates
  if (bookValid) {
    var bookArrayLen = gLibrary.myBookArray.length;
    // console.log("bookArrayLen: ", bookArrayLen);
    if (bookArrayLen > 0) {    // perform search
      // console.log("bookArrayLen > 0: ", bookArrayLen);
      for(var i = 0; (i < bookArrayLen && isNewBook); i++){
        if ((gLibrary.myBookArray[i].title == myBook.title)
        && (gLibrary.myBookArray[i].author == myBook.author)) {
          isNewBook = false;
        };
      };
    };
  }
  else{
    isNewBook = false;
  };
  // if book isn't already there, insert data into new element
  if (isNewBook) {
    gLibrary.myBookArray.push(myBook);
          // console.log("add new:", myBook.title+" ("+myBook.author+")");   // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  }
  else {
        // NOTE: Book with same title and author can only appear once in the array??
          console.log("Book already exists: ", myBook.title+" ("+myBook.author+")");    // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  };
  // console.log ("new book added? ",isNewBook,myBook);
  return isNewBook;
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
  var removalCount = 0;
  var bookMaxIndex = gLibrary.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myTitle ==  gLibrary.myBookArray[i].title) {
      // console.log("removing book ",i,gLibrary.myBookArray[i].title);
      gLibrary.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
    console.log(removalCount +"  Books removed: "+myTitle);          // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  }
  else {
    console.log("Book not found: "+myTitle);                         // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  };
  // console.log(booksRemoved);
  return booksRemoved;
};

//******************************************** Remove book by author
library.prototype.removeBookByAuthor = function(myAuthor){
  var removalCount = 0;
  var bookMaxIndex = gLibrary.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myAuthor ==  gLibrary.myBookArray[i].author) {
      // console.log("removing book ",i,gLibrary.myBookArray[i].author);
      gLibrary.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
    console.log(removalCount +" Books by "+myAuthor+" removed");          // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  }
  else {
    console.log("Books by "+myAuthor+" not found");                      // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  };
  console.log(booksRemoved);
  return booksRemoved;
};

//********************************************  Get random book object from your books array
library.prototype.getRandomBook = function(){};  //()
    // math.random, math.float?   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    //******************************************** get list of books by title
library.prototype.getBookByTitle = function(queryString){
  var titleArray = [];
  var resultsCount = 0;
  var pos = 0;
  // console.log("level 1: looking for ",queryString);
  for (var i=0; i<gLibrary.myBookArray.length; i++) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    pos = gLibrary.myBookArray[i].title.indexOf(queryString);
    // console.log("  level 2: i = "+i+", pos = "+pos+" pos>0? "+(pos>=0));
    if (pos >= 0) {
      // console.log("    level 3: i = "+i+", match, add to results array");
      titleArray[resultsCount] = gLibrary.myBookArray[i];
      resultsCount++;
    };
  };
  // console.log(resultsCount,titleArray);
  // if (resultsCount>0) { console.log (resultsCount+" matches found for "+queryString);      // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  // }
  // else                { console.log("No matches found for "+queryString);          // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  // };
  return titleArray;
};

//******************************************** get list of books by author
library.prototype.getBooksByAuthor = function(queryString){
  var authorArray = [];
  var resultsCount = 0;
  var pos = 0;
  // console.log("level 1: looking for ",queryString);
  for (var i=0; i<gLibrary.myBookArray.length; i++) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
  pos = gLibrary.myBookArray[i].author.indexOf(queryString);
    // console.log("  level 2: i = "+i+", pos = "+pos+" pos>0? "+(pos>=0));
    if (pos >= 0) {
      // console.log("    level 3: i = "+i+", match, add to results array");
      authorArray[resultsCount] = gLibrary.myBookArray[i];
      resultsCount++;
    };
  };
  console.log(resultsCount,authorArray);
  if (resultsCount>0) { console.log (resultsCount+" matches found for "+queryString);      // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  }
  else                { console.log("No matches found for "+queryString);          // NOTE:  THIS IS A STATUS TO BE REPORTED NOTE:
  };
  return authorArray;
};






//******************************************** Add an array of books
library.prototype.addBooks = function(){};  //(books)

//******************************************** get list authors author
library.prototype.getAuthors = function(){};  //()

//******************************************** Get random author
library.prototype.getRandomAuthorName = function(){};  //()

//  put instances at bottom per Eric
var gLibrary = new library();   // global library
var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Fantasy");
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);
var book3 = new newBook( "The Lincoln Lawyer","Michael Connolly", 315, 2005);
var book4 = new newBook( "Seven Databases in Seven Weeks","Eric Redmond and Jim R. Wilson", 212, 2013);
var book5 = new newBook( "The Masterharper of Pern","Anne McCaffrey", 212, 1998);
var book6 = new newBook( "The Bourne Identity","Different Author", 256, 1981);   // test duplicate book
var book7 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);   // test duplicate book

gLibrary.addBook(book1);
gLibrary.addBook(book2);
gLibrary.addBook(book3);
gLibrary.addBook(book4);
gLibrary.addBook(book5);
gLibrary.addBook(book6);
gLibrary.addBook(book7);

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
