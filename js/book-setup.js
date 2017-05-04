//// use glibrary.logArray in console to get all messages printed to log
function newBook(title, author, pgCount, publishDt, other) {
  this.title = title;
  this.author = author;
  this.pgCount = pgCount;
  this.publishDt = new Date(publishDt);
  this.other = other;
};

var library = function(){};

library.prototype.myBookArray = [];

library.prototype.logArray = [];   // set up a log of events
library.prototype.reportLog = false;  // can turn console log events from logMessage on and off

library.prototype.init = function(){
  this.$form = $("form");
  this.$formWrapper = $("div.forms");

  this.$addBooks = $("button.add-books");
  this.$addRow = $("button.add-row");
  this.$rowWrapper = $("div.form-group");

  this.$getAuthors = $("button.get-authors");
  this.$getRandomBook = $("button.get-random-book");
  this.$getRandomAuthorName = $("button.get-random-author-name");
  this.$removeBookByTitle = $("button.remove-book-by-title");
  this.$removeBookByAuthor = $("button.remove-book-by-author");
  this.$getBookByTitle = $("button.get-book-by-title");
  this.$getBooksByAuthor = $("button.get-books-by-author");
  this.$getBookInfo = $("button.get-book-info");
  this._bindEvents();
};

library.prototype._bindEvents = function(){
    this.$addBooks.on("click", $.proxy(this._handleRows, this));
    this.$addRow.on("click", $.proxy(this._addRow, this));
    this.$getAuthors.on("click", $.proxy(this._getAuthors, this));
    this.$getRandomBook.on("click", $.proxy(this._getRandomBook, this));
    this.$getRandomAuthorName.on("click", $.proxy(this._getRandomAuthorName, this));
    this.$removeBookByTitle.on("click", $.proxy(this._removeBookByTitle, this));
    this.$removeBookByAuthor.on("click", $.proxy(this._removeBookByAuthor, this));
    this.$getBookByTitle.on("click", $.proxy(this._getBookByTitle, this));
    this.$getBooksByAuthor.on("click", $.proxy(this._getBooksByAuthor, this));
    this.$getBookInfo.on("click", $.proxy(this._getBookInfo, this));
};

// **************** put current library book list in left jubmotron ************
library.prototype._currentState = function(){
  $('#jtlib > li').remove();
  // var tempDate = '';                                           // NOTE:  toLocaleDateString testing
  for (var i=0; i<this.myBookArray.length; i++){
    $("ul#jtlib").append("<li>" + this.myBookArray[i].title +
      " (" + this.myBookArray[i].author + ") " +
      this.myBookArray[i].pgCount + " pages, publish date: " +
      this.myBookArray[i].publishDt.toLocaleDateString() + "</li>");

      // tempDate = this.myBookArray[i].publishDt;                // NOTE:  testing to figure out whye
      // console.log(i,tempDate, tempDate.toLocaleDateString());  // NOTE:  toLocaleDateString breaks
                                                                  // NOTE:  after running libGet()
  };
};

// **************** add a book array element's data to right jumbotron**********
library.prototype._appendBookData = function(bookElement) {
  $("ul#jtres").append("<li>" + bookElement.title +
      " (" + bookElement.author + ") " +
      bookElement.pgCount + " pages, publish date: " +
      bookElement.publishDt.toLocaleDateString() + "</li>");
};



// **************** add more rows so multiple books can be added ***************
library.prototype._addRow = function(){
  this.$rowWrapper.append(this._rowHTML);
};
library.prototype._rowHTML = function(){
  return '<br /><form class="newrow another">' +
  '<div class="col-xs-4">' +
    '<input class="form-control" id="title" type="text" placeholder="Book Title">' +
  '</div>' +
  '<div class="col-xs-4">' +
    '<input class="form-control" id="author" type="text" placeholder="Author">' +
  '</div>' +
  '<div class="col-xs-2">' +
    '<input class="form-control" id="pgCount" type="number" placeholder="Page Count">' +
  '</div>' +
  '<div class="col-xs-2">' +
    '<input class="form-control" id="publishDt" type="date">' +
  '</div>' +
  '</form>' ;
};

// **************** Get content of rows on document, add to library*************
library.prototype._handleRows = function(){
  var _self = this;
  tempArray = [];
  aIndex = -1;
  $(".newrow").each(function(index,value) {
    var bkTitle = $(this).find("#title").val();
    var bkAuthor = $(this).find("#author").val();
    var bkPgCnt = $(this).find("#pgCount").val();
    var bkDate = $(this).find("#publishDt").val();
    if(bkTitle && bkAuthor && bkPgCnt && bkDate) {
      var book = new newBook(bkTitle, bkAuthor, bkPgCnt, bkDate);    // NOTE:  add "other" field
      aIndex++;
      tempArray[aIndex] = book;
    };
  });
  _self._addBooks(tempArray);
  _self._currentState();            // Update book list in jumbo-tron
  $('.another').remove();           // Clear out extra "add book" input rows
  $(".newrow")[0].reset();          // reset input cells for book input row
};

library.prototype._addBooks = function(bookArray){
  var addCount = this.addBooks(bookArray);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>" + addCount + " books added to library</strong></li>");
};


library.prototype._getAuthors = function(){
  var myAuthArray = this.getAuthors();
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>" + myAuthArray.length + " distinct authors returned</strong></li>");
  for (var i=0;i<myAuthArray.length;i++) {
    $("ul#jtres").append("<li>" + myAuthArray[i] + " </li>");
  };
};

library.prototype._getRandomBook = function(){
  var myBookElement = this.getRandomBook();
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Random book result:</strong></li>");
  this._appendBookData(myBookElement);
};

library.prototype._getRandomAuthorName = function(){
  var myAuthor = this.getRandomAuthorName();
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Random author result:</strong></li>");
  $("ul#jtres").append("<li>" + myAuthor + " </li>");
};

library.prototype._removeBookByTitle = function(){
  _self = this;
  var myTitle = document.getElementById("rbbt").value;
  var removed = _self.removeBookByTitle(myTitle);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Book(s) '" + myTitle + "' removed from library</strong></li>");
  _self._currentState();
  $(".b-srch")[0].reset();
};

library.prototype._removeBookByAuthor = function(){
  _self = this;
  var myAuthor = document.getElementById("rbba").value;
  var removed = _self.removeBookByAuthor(myAuthor);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Book(s) by author '" + myAuthor + "' removed from library</strong></li>");
  _self._currentState();
  $(".a-srch")[0].reset();
};

library.prototype._getBookByTitle = function(){
  var myTitle = document.getElementById("gbbt").value;
  var myBookArray = this.getBookByTitle(myTitle);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Book names containing '" + myTitle + "':</strong></li>");
  for (var i=0;i<myBookArray.length;i++) {
    this._appendBookData(myBookArray[i]);
  };
  $(".b-srch")[0].reset();
};

library.prototype._getBooksByAuthor = function(){
  var myAuthor = document.getElementById("gbba").value;
  var myBookArray = this.getBooksByAuthor(myAuthor);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Book(s) by author name containing '" + myAuthor + "':</strong></li>");
  for (var i=0;i<myBookArray.length;i++) {
    this._appendBookData(myBookArray[i]);
  };
  $(".a-srch")[0].reset();
};

library.prototype._getBookInfo = function(){
  var mySearch = document.getElementById("gbi").value;
  var myBookArray = this.getBookInfo(mySearch);
  $('#jtres > li').remove();
  $("ul#jtres").append("<li align=center><strong>Library search for '" + mySearch + ":</strong></li>");
  for (var i=0;i<myBookArray.length;i++) {
    this._appendBookData(myBookArray[i]);
  };
  $(".m-srch")[0].reset();
};

//******************************* END OF jQuery additions ******************************

//******************************************** Add an array of books
library.prototype.addBooks = function(inputBookArray){
  var addCount = 0;
  if (typeof(inputBookArray) != "undefined" && inputBookArray.length >> 0) {
    var inputArrayLen = inputBookArray.length;
    for (var i = 0; (i < inputArrayLen); i++){
      if (this.addBook(inputBookArray[i])) {
        addCount++;
      };
    };
    this.logMessage(eval('"addBooks: "+addCount+" books added"'));
  }
  else {
    this.logMessage(eval('"addBooks: ***WARNING*** No book array specified"'));
  };
  return addCount;
};

//******************************************** Add book to array
library.prototype.addBook = function(myBook){
  var isNewBook = true;
  // increment through existing books and check for duplicates
  var bookArrayLen = this.myBookArray.length;
  if (typeof(myBook) != "undefined") {
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
      if (this.validBookInfo(myBook)) {
        this.myBookArray.push(myBook);
        this.logMessage(eval('"addBook: Book added!  "+ myBook.title+" ("+myBook.author+")"'));      //  add to array
      }
      else {
        this.logMessage(eval('"addBook: ***ERROR*** Book not valid: "+ myBook.title+" ("+myBook.author+")"'));
        isNewBook = false;
      };
    };
  }
  else {
    this.logMessage(eval('"addBook: ***WARNING*** No book specified"'));
    isNewBook = false;
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
  if (typeof(myBook.publishDt) != "number" && typeof(myBook.publishDt) != "string"
        && typeof(myBook.publishDt) != "object") {
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
  // NOTE: no validation on any other stuff that might be passed in
  return goodInput;
};

//******************************************** Remove book by title
library.prototype.removeBookByTitle = function(myTitle){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  if (typeof(myTitle) != "undefined" && myTitle.length >> 0) {
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
  }
  else {
    this.logMessage(eval('"removeBookByAuthor: ***WARNING*** No book specified"'));
  };
  return booksRemoved;
};

//******************************************** Remove book by author
library.prototype.removeBookByAuthor = function(myAuthor){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  if (typeof(myAuthor) != "undefined" && myAuthor.length >> 0) {
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
  }
  else {
  this.logMessage(eval('"removeBookByAuthor: ***WARNING*** No author specified"'));
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
  if (queryString.length) {
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
  };
  return titleArray;
};

//******************************************** get list of books by author
library.prototype.getBooksByAuthor = function(queryString){
  var authorArray = [];
  if (queryString.length) {
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
  };
  return authorArray;
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

//**************** BONUS CONTENT ********************************************
//******************************************** Search for stuff in book array
library.prototype.getBookInfo = function(queryString){
  var searchArray = [];
  var resultsCount = 0;
  var pos = 0;
  var searchString = "";
  if (typeof(queryString) != "undefined" && queryString.length >> 0) {
    for (var i=0; i<this.myBookArray.length; i++) {
      searchString = this.myBookArray[i].title.concat(
        this.myBookArray[i].author,
        this.myBookArray[i].pgCount,
        this.myBookArray[i].publishDt,
        this.myBookArray[i].other
      );
      pos = searchString.toLowerCase().indexOf(queryString.toLowerCase());
      if (pos >= 0) {
        searchArray[resultsCount] = this.myBookArray[i];
        resultsCount++;
      };
    };
    if (resultsCount>0) {
      this.logMessage(eval('"getBookInfo: "+resultsCount+" matches found for "+queryString'));
    }
    else {
      this.logMessage(eval('"getBookInfo: ***ERROR*** No matches found for "+queryString'));
    };
  }
  else {
  this.logMessage(eval('"getBookInfo: ***WARNING*** search info specified"'));
  };
  return searchArray;
};

//******************************************** Store current myBookArray content in localStorage
library.prototype.libStore = function() {
  this.logMessage(eval('"libStore:  Checking for local storage support: typeof(Storage)="+typeof(Storage)'));
  if(typeof(Storage) !== "undefined") {
    localStorage.storedArray = JSON.stringify(this.myBookArray);
    this.logMessage(eval('"libStore:  array stored."'));
  }
  else {
    this.logMessage(eval('"libStore:  Sorry, your browser does not support web storage..."'));
  };
  return;
};

//******************************************** Retrieve previously stored myBookArray content from localStorage
library.prototype.libGet = function() {
  if(typeof(Storage) !== "undefined") {
    if (typeof(localStorage.storedArray) !== "undefined") {
      this.myBookArray = JSON.parse(localStorage.storedArray);
      this.logMessage(eval('"libGet:  array retrieved."'));
    }
    else {
      this.logMessage(eval('"libGet:  array was not preveiously stored; therefore current contents were not replaced"'));
    };
  }
  else {
        this.logMessage(eval('"libGet:  Sorry, your browser does not support web storage..."'));
  };
  return;
};

//******************************************** Clear out localStorage
library.prototype.clearStorage = function() {
  if (typeof(localStorage.storedArray) !== "undefined") {
    localStorage.removeItem("storedArray");
    this.logMessage(eval('"clearStorage:  Storage cleared."'));
  }
  else {
    this.logMessage(eval('"clearStorage:  array was not preveiously stored"'));
  };
  return;
};

//******************************************** Log messages to array
library.prototype.logMessage = function(message){
  if (this.reportLog == true) { console.log(message);
  };
  this.logArray[this.logArray.length] = message;
  return;
};

//******************************************** END ************************
var gLibrary = new library();
gLibrary.init();

//******************************************** TEST cases
var book1 = new newBook( "The White Dragon","Anne McCaffrey", 365, 1978, "Loaned to Teresa 6/15/2016");
var book2 = new newBook( "The Bourne Identity","Robert Ludlum", 256, 1981);
var book3 = new newBook( "The Lincoln Lawyer","Michael Connolly", 315, 2005, "5 stars!");
var book4 = new newBook( "Seven Databases in Seven Weeks","Eric Redmond and Jim R. Wilson", 212, 2013, "Regis MSCD664");
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

var book8 = new newBook( "Teresa's Guide","Robert Ludlum", 256, 1981);
var book9 = new newBook( "My Guide","Teresa Adams Creech", 256, 1981);

//******************************************** Add an array of books
gLibrary.reportLog = false; // toggle message logging to console
var result = gLibrary.addBooks(tempBookArray);
// gLibrary.libGet();   // NOTE:  somehow this breaks the localedate function in the _currentState routine
gLibrary._currentState();
