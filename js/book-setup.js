//// use glibrary.logArray in console to get all messages printed to log

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
library.prototype.reportLog = false;  // can turn console log events from logMessage on and off


//******************************************** Log messages to array
library.prototype.logMessage = function(message){
  if (this.reportLog == true) { console.log(message);
  };
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

//******************************************** Add book to array
library.prototype.addBook = function(myBook){
  var isNewBook = true;
  // increment through existing books and check for duplicates
  var bookArrayLen = this.myBookArray.length;
  if (bookArrayLen > 0) {    // we have existing books; perform search
    for(var i = 0; (i < bookArrayLen && isNewBook); i++){
      if ((this.myBookArray[i].title == myBook.title)
      && (this.myBookArray[i].author == myBook.author)) {   // not a new book
        this.logMessage(eval('"addBook: ***ERROR*** Book already exists: "+myBook.title+" ("+myBook.author+")"'));
        isNewBook = false;
      };
    };
  };
  if (isNewBook) {
      // var bookValid = this.validBookInfo(myBook);
    if (this.validBookInfo(myBook)) {
      this.myBookArray.push(myBook);
      this.logMessage(eval('"addBook: Book added!  "+ myBook.title+" ("+myBook.author+")"'));      //  add to array
    }
    else {
      this.logMessage(eval('"addBook: ***ERROR*** Book not valid: "+ myBook.title+" ("+myBook.author+")"'));
      isNewBook = false;
    };
  };
  return isNewBook;
};

//******************************************** Validate inputs prior to adding to array
library.prototype.validBookInfo = function(myBook){
  // NOTE:  Use form validation when working with inputs from presentation layer  https://www.w3schools.com/js/js_validation_api.asp
  var goodInput = true;
  this.logMessage(eval('"validBookInfo: "+myBook.title+"   "+myBook.author+"   "+myBook.pgCount+"   "+myBook.publishDt'));
      //--------------------------------------------------
  if ((typeof(myBook.title)!="string") && (typeof(myBook.title)!="number")) {
    this.logMessage(eval('"validBookInfo: ***ERROR*** Incorrect datatype: title = "+ myBook.title'));
    goodInput = false;
  }
  else {
    if (typeof(myBook.publishDt) == "number") {
      myBook.title = myBook.title.toString();
    };
  }
    //--------------------------------------------------
  if (typeof(myBook.author) != "string") {
    this.logMessage(eval('"validBookInfo: ***ERROR*** Incorrect datatype: author = "+ myBook.author'));
    goodInput = false;
  };
    //--------------------------------------------------
  if (typeof(myBook.pgCount) != "number" && typeof(myBook.pgCount) != "string") {  // NOTE:  fix this for test case book14 (returns NaN)     ***** FIX THIS
    goodInput = false;
    this.logMessage(eval('"validBookInfo: ***ERROR*** Incorrect datatype: Page Count = "+ myBook.pgCount'));
  }
  else {     // it's a number or a string, now see if we can convert it
    if (typeof(myBook.pgCount) == "string") {
      myBook.pgCount = Number(myBook.pgCount);
      if (isNaN(myBook.pgCount)) {
        goodInput = false;
        this.logMessage(eval('"validBookInfo: ***ERROR*** Invalid data: Page Count = "+ myBook.pgCount'));
      };
    };
  };
    //--------------------------------------------------
  if (typeof(myBook.publishDt) != "number" && typeof(myBook.publishDt) != "string") {  // NOTE:  fix this for test case book14 (returns Invalid Date)     ***** FIX THIS
    goodInput = false;
    this.logMessage(eval('"validBookInfo: ***ERROR*** Incorrect datatype: Publish Date = "+ myBook.publishDt'));
  }
  else {     // it's a number or a string, now see if we can convert it
      if (isNaN(Date.parse(myBook.publishDt))) {
        this.logMessage(eval('"validBookInfo: ***ERROR*** Invalid data: Publish Date = "+ myBook.publishDt'));
        goodInput = false;
      }
      else {
        if (typeof(myBook.publishDt) == "number") {
          myBook.publishDt = myBook.publishDt.toString();
        };
        if (myBook.publishDt.length == 4) {
          myBook.publishDt = "1/1/"+myBook.publishDt;
        };
        myBook.publishDt = new Date(myBook.publishDt); // convert to js date format
        if (myBook.publishDt == "Invalid Date") {
          goodInput = false;
          this.logMessage(eval('"validBookInfo: ***ERROR*** Invalid data: Publish Date = "+ myBook.publishDt'));
        };
    };
  };
  // };
  // NOTE: no validation on any other stuff that might be passed in
  return goodInput;
};

//******************************************** Remove book by title
library.prototype.removeBookByTitle = function(myTitle){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myTitle.toLowerCase() == this.myBookArray[i].title.toLowerCase()) {
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
      this.logMessage(eval('"removeBookByTitle: "+removalCount +"  Books removed: "+myTitle'));
  }
  else {
      this.logMessage(eval('"removeBookByTitle: ***WARNING*** Book not found: "+myTitle'));
  };
  return booksRemoved;
};

//******************************************** Remove book by author
library.prototype.removeBookByAuthor = function(myAuthor){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myAuthor.toLowerCase() == this.myBookArray[i].author.toLowerCase()) {
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
    };
  };
  if (booksRemoved)  {
      this.logMessage(eval('"removeBookByAuthor: "+removalCount +" Books by "+myAuthor+" removed"'));
  }
  else {
      this.logMessage(eval('"removeBookByAuthor: ***WARNING*** Books by "+myAuthor+" not found"'));
  };
  return booksRemoved;
};

//********************************************  Get random book
library.prototype.getRandomBook = function(){
  var bookArrayLen = this.myBookArray.length;    // get size of current array
  if (bookArrayLen > 0) {
    var randomIndex = Math.round(Math.random()*(bookArrayLen-1));
      this.logMessage(eval('"GetRandomBook: "+randomIndex, this.myBookArray[randomIndex].title'));
    return this.myBookArray[randomIndex];
  }
  else {
      this.logMessage(eval('"GetRandomBook: ***WARNING*** No books!"'));
    return null;
  };
};

//******************************************** get list of books by title
library.prototype.getBookByTitle = function(queryString){
  var titleArray = [];
  var resultsCount = 0;
  var pos = 0;
  for (var i=0; i<this.myBookArray.length; i++) {
    pos = this.myBookArray[i].title.toLowerCase().indexOf(queryString.toLowerCase());
    if (pos >= 0) {
      titleArray[resultsCount] = this.myBookArray[i];
      resultsCount++;
    };
  };
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
  for (var i=0; i<this.myBookArray.length; i++) {
      pos = this.myBookArray[i].author.toLowerCase().indexOf(queryString.toLowerCase());
    if (pos >= 0) {
      authorArray[resultsCount] = this.myBookArray[i];
      resultsCount++;
    };
  };
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
  var lookForAuthor;
  for (var i = 0; (i < bookArrayLen); i++){
    //** look for current book's author in the author array
    //   first time through, author array is empty so -1 will be result
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
    this.logMessage(eval('"GetRandomBook: ***WARNING*** No authors!"'));
    return null;
  };

};


//  put instances at bottom per Eric
var gLibrary = new library();   // global library


//******************************************** TEST cases

var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Fantasy");
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);
var book3 = new newBook( "The Lincoln Lawyer","Michael Connolly", 315, 2005);
var book4 = new newBook( "Seven Databases in Seven Weeks","Eric Redmond and Jim R. Wilson", 212, 2013);
var book5 = new newBook( "The Masterharper of Pern","Anne McCaffrey", 212, 1998);
var book6 = new newBook( "The Bourne Identity","Different Author", 256, 1981);   // test duplicate book
var book7 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);   // test duplicate book

var tempBookArray = [];
tempBookArray[0] = book1;
tempBookArray[1] = book2;
tempBookArray[2] = book3;
tempBookArray[3] = book4;
tempBookArray[4] = book5;
tempBookArray[5] = book6;
tempBookArray[6] = book7;


//******************************************** Add book to array
gLibrary.reportLog = false;
// gLibrary.addBook(book1);
// gLibrary.addBook(book2);
// gLibrary.addBook(book3);
// gLibrary.addBook(book4);
// gLibrary.addBook(book5);
// gLibrary.addBook(book6);
// gLibrary.addBook(book7);  //  this one should fail


//********************************************  Get random book
gLibrary.reportLog = false; // toggle message logging to console
// var result = gLibrary.getRandomBook();
// console.log(result);


//******************************************** Add an array of books
//===>  to see results:  this.bookArray for array; result for count
//
gLibrary.reportLog = false; // toggle message logging to console
// var result = gLibrary.addBooks(tempBookArray);
// console.log(result);


//******************************************** Remove book by title
gLibrary.reportLog = false; // toggle message logging to console
var remTitle1 = "The Bourne Identity";
var remTitle2 = "1984";  // this one should return "no book founc"
// gLibrary.removeBookByTitle(remTitle1);
// gLibrary.removeBookByTitle(remTitle2);


//******************************************** Remove book by author
gLibrary.reportLog = false; // toggle message logging to console
var remAuthor1 = "Anne McCaffrey";
var remAuthor2 = "George Orwell";  // this one should return "no book founc"
// gLibrary.removeBookByAuthor(remAuthor1);
// gLibrary.removeBookByAuthor(remAuthor2);


//******************************************** get list of books by title
// ===>  to see results:  titleArray; to do a test:  gLibrary.getBookByTitle("data")
gLibrary.reportLog = false; // toggle message logging to console
var findBook1 = "Seven";    // beginning string
var findBook2 = "Pern";    // ending string
var findBook3 = "Database";    // middle string
var findBook4 = "Bourne";    // multiple books
var findBook5 = "nomatch";    // no match
var findBook6 = "database"   // should not be case sensitive
var titleArray = [];
// titleArray = gLibrary.getBookByTitle(findBook1);
// console.log(titleArray);
// titleArray = gLibrary.getBookByTitle(findBook2);
// console.log(titleArray);
// titleArray = gLibrary.getBookByTitle(findBook3);
// console.log(titleArray);
// titleArray = gLibrary.getBookByTitle(findBook4);
// console.log(titleArray);
// titleArray = gLibrary.getBookByTitle(findBook5);
// console.log(titleArray);
// titleArray = gLibrary.getBookByTitle(findBook6);
// console.log(titleArray);


//******************************************** get list of books by author
// ===>  to see results:  authorArray; to do a test:  gLibrary.getBooksByAuthor("ann")
gLibrary.reportLog = false; // toggle message logging to console
var findAuthor1 = "Michael";    // beginning string
var findAuthor2 = "Ludlum";    // ending string
var findAuthor3 = "NNE";    // middle string
var findAuthor4 = "Anne";    // multiple books
var findAuthor5 = "Orwell";    // no match
var findAuthor6 = "michael";    // case insensitive
var authorArray = [];
// authorArray = gLibrary.getBooksByAuthor(findAuthor1);
// console.log(authorArray);
// authorArray = gLibrary.getBooksByAuthor(findAuthor2);
// console.log(authorArray);
// authorArray = gLibrary.getBooksByAuthor(findAuthor3);
// console.log(authorArray);
// authorArray = gLibrary.getBooksByAuthor(findAuthor4);
// console.log(authorArray);
// authorArray = gLibrary.getBooksByAuthor(findAuthor5);
// console.log(authorArray);
// authorArray = gLibrary.getBooksByAuthor(findAuthor6);
// console.log(authorArray);


//******************************************** get list of authors
// ===>  to see results:  arrayOfAuthors = gLibrary.getAuthors();
gLibrary.reportLog = false; // toggle message logging to console
// var arrayOfAuthors = [];
// arrayOfAuthors = gLibrary.getAuthors();

//******************************************** Get random author
gLibrary.reportLog = false; // toggle message logging to console
// var result = gLibrary.getRandomAuthorName();
// console.log(result);

//88888888888888888888888888888  test block for validating fields  on addBook  8888888888888888888888888888888888888
var bookInv1 = new newBook( true,false,true,false); // test title
var bookInv2 = new newBook( "The White Dragon",false,true,false); // test author
var bookInv3 = new newBook( "The White Dragon","Anne McCaffrey", true,true); // test pgCount
var bookInv4 = new newBook( "The White Dragon","Anne McCaffrey", 365, false);// test publishDt
var bookInv5 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "5 stars", "Borrowed from Teresa"); // test too many args
var bookInv6 = new newBook( "The White Dragon");                // test on 1 arg
var bookInv7 = new newBook( );                                 // test on no args

// gLibrary.addBook(bookInv1);
// gLibrary.addBook(bookInv2);
// gLibrary.addBook(bookInv3);
// gLibrary.addBook(bookInv4);
// gLibrary.addBook(bookInv5);
// gLibrary.addBook(bookInv6);
// gLibrary.addBook(bookInv7);

// test cases for numbers vs strings on pgCount and publishDt
var book10 = new newBook("test title10","test author", 555, 1979);
var book11 = new newBook("test title11","test author", "555", "1979");
var book12 = new newBook("test title12","test author", 555, "5/1/1979");
var book13 = new newBook("test title13","test author", "555", "5-1-1979");
var book14 = new newBook("test title14","test author", "nnn", "nnn");
var book15 = new newBook("test title15","test author", "nnn", 1979);
var book16 = new newBook("test title16","test author", 555, 197);
// gLibrary.addBook(book10);
// gLibrary.addBook(book11);
// gLibrary.addBook(book12);
// gLibrary.addBook(book13);
// gLibrary.addBook(book14);
// gLibrary.addBook(book15);
// gLibrary.addBook(book16);


// var bookInv8 = null;  // test null args
// gLibrary.addBook(bookInv8);
// var bookInv9 = new newBook( The White Dragon, Anne McCaffrey, 365, 1978);  // test  args not in quotes
// gLibrary.addBook(bookInv9);
//
