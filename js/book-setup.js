function newBook(title, author, pgcount, publishDt) {
  this.title = title;
  this.author = author;
  this.pgcount = pgcount;
  this.publishDt = publishDt;
};

var library(){
};

library.prototype.myBookArray = [];   // set up method add books to array
                        // or = new array();
library.prototype.addBook =  // method to add book to array
library.prototype.removeBookByTitle	= //(title)
library.prototype.removeBookByAuthor	= //(authorName)
library.prototype.getRandomBook	= //()
library.prototype.getBookByTitle	= //(title)
library.prototype.getBooksByAuthor	= //(authorName)
library.prototype.addBooks	= //(books)
library.prototype.getAuthors	= //()
library.prototype.getRandomAuthorName	= //()
