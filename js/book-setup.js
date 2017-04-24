function test(){
  console.log("test");   // type test(); in console to call this to ensure we're communication with this js file
};

function newBook(title, author, pgcount, publishDt) {
  this.title = title;
  this.author = author;
  this.pgcount = pgcount;
  this.publishDt = publishDt;
};

var library = function(){};

library.prototype.myBookArray = [];   // set up method add books to array
                        // or = new array();
library.prototype.addBook = function(){};  // method to add book to array
library.prototype.removeBookByTitle = function(){};  //(title)
library.prototype.removeBookByAuthor = function(){};  //(authorName)
library.prototype.getRandomBook = function(){};  //()
library.prototype.getBookByTitle = function(){}; //(title)
library.prototype.getBooksByAuthor = function(){};  //(authorName)
library.prototype.addBooks = function(){};  //(books)
library.prototype.getAuthors = function(){};  //()
library.prototype.getRandomAuthorName = function(){};  //()

//  put instances at bottom per Eric
var gLibrary = new library();   // global library
var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978);   //  FIGURE OUT DATE!!!
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981); //  FIGURE OUT DATE!!!
