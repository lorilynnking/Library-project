function newBook(title, author, pgCount, publishDt, other) {
  this.title = title;
  this.author = author;
  this.pgCount = pgCount;
  this.publishDt = new Date(publishDt);
  this.other = other;
};

var library = function(){};

library.prototype.myBookArray = [];

library.prototype.init = function(){
  this.$rowWrapper = $("div.form-group");
  this._bindEvents();
};

library.prototype._bindEvents = function(){
  $("button.add-books").on("click", $.proxy(this._handleRows, this));
  $("button.add-row").on("click", $.proxy(this._addRow, this));
  $("button.get-authors").on("click", $.proxy(this._getAuthors, this));
  $("button.get-random-book").on("click", $.proxy(this._getRandomBook, this));
  $("button.get-random-author-name").on("click", $.proxy(this._getRandomAuthorName, this));
  $("button.remove-book-by-title").on("click", $.proxy(this._removeBookByTitle, this));
  $("button.remove-book-by-author").on("click", $.proxy(this._removeBookByAuthor, this));
  $("button.get-book-by-title").on("click", $.proxy(this._getBookByTitle, this));
  $("button.get-books-by-author").on("click", $.proxy(this._getBooksByAuthor, this));
  $("button.get-book-info").on("click", $.proxy(this._getBookInfo, this));
  $("button.svlib").on("click", $.proxy(this._libStore, this));
};

library.prototype._currentState = function(){
  $('#jtlib > li').remove();                    // start with empty screen
  for (var i=0; i<this.myBookArray.length; i++){
    $("ul#jtlib").append("<li>" + this.myBookArray[i].title +
      " (" + this.myBookArray[i].author + ") " +
      this.myBookArray[i].pgCount + " pages, publish date: " +
      this.myBookArray[i].publishDt.toLocaleDateString() + "</li>");
  };
};

library.prototype._msgRefresh = function(message){
  $('#jtres > li').remove();
  $("ul#jtres").append(message);
  return;
};

library.prototype._appendBookData = function(bookElement,inputId) {
  if(bookElement) {
    var bkString = "<li>" + bookElement.title +
        " (" + bookElement.author + ") " +
        bookElement.pgCount + " pages, publish date: " +
        bookElement.publishDt.toLocaleDateString();
    if (bookElement.other) { bkString = bkString + " (Comments: " + bookElement.other +")</li>"; }
    else                   { bkString = bkString + "</li>"; };
    $("ul#jtres").append(bkString);
    if (inputId) {$(inputId)[0].reset()};   // reset input box
  };
};

library.prototype._addRow = function(){
  this.$rowWrapper.append('<form class="newrow another">' +
  '<div class="col-xs-3">' +
  '  <input class="form-control title" type="text" placeholder="Book Title">' +
  '</div>' +
  '<div class="col-xs-3">' +
  '  <input class="form-control author" type="text" placeholder="Author">' +
  '</div>' +
  '<div class="col-xs-2">' +
  '  <input class="form-control pgCount" type="number" placeholder="Page Count">' +
  '</div>' +
  '<div class="col-xs-2">' +
  '  <input class="form-control publishDt" type="date" placeholder="mm/dd/yyyy">' +
  '</div>' +
  '<div class="col-xs-2">' +
  '  <input class="form-control other" type="text" placeholder="Comments">' +
  '</div>' +
  '</form>');
};

library.prototype._handleRows = function(){
  var _self = this;
  addCount = 0;
  $(".newrow").each(function(index,value) {
    var bkTitle = $(this).find(".title").val();
    var bkAuthor = $(this).find(".author").val();
    var bkPgCnt = $(this).find(".pgCount").val();
    var bkDate = $(this).find(".publishDt").val();
    var bkOther = $(this).find(".other").val();    // this one is optional
    if(bkTitle && bkAuthor && bkPgCnt && bkDate) {
      if (_self.addBook(new newBook(bkTitle, bkAuthor, bkPgCnt, bkDate, bkOther))) {addCount++;};
    };
  });
  this._msgRefresh("<li align=center><strong>" + addCount + " book(s) added to library</strong></li>");
  this._currentState();            // Update book list in jumbo-tron
  $('.another').remove();           // Clear out extra "add book" input rows
  $(".newrow")[0].reset();          // reset input cells for book input row
};

library.prototype._getAuthors = function(){
  var myAuthArray = this.getAuthors();
  this._msgRefresh("<li align=center><strong>" + myAuthArray.length + " distinct authors returned</strong></li>");
  for (var i=0;i<myAuthArray.length;i++) {  $("ul#jtres").append("<li>" + myAuthArray[i] + " </li>");  };
};

library.prototype._getRandomBook = function(){
  var myBookElement = this.getRandomBook();
  this._msgRefresh("<li align=center><strong>Random book result:</strong></li>");
  this._appendBookData(myBookElement,"");  // no input field to reset
};

library.prototype._getRandomAuthorName = function(){
  var myAuthor = this.getRandomAuthorName();
  this._msgRefresh("<li align=center><strong>Random author result:</strong></li>");
  if (myAuthor) {   $("ul#jtres").append("<li>" + myAuthor + " </li>");  };
};

library.prototype._removeBookByTitle = function(){
  var myTitle = document.getElementById("rbbt").value;
  var remStatus = "";
  var removed = this.removeBookByTitle(myTitle);
  if (!removed) {remStatus = " NOT";}
  this._msgRefresh("<li align=center><strong>Book(s) '" + myTitle + "'" + remStatus +" removed from library</strong></li>");
  this._currentState();
  $(".b-srch")[0].reset();   // reset input box
};

library.prototype._removeBookByAuthor = function(){
  var myAuthor = document.getElementById("rbba").value;
  var remStatus = "";
  var removed = this.removeBookByAuthor(myAuthor);
  if (!removed) {remStatus = " NOT";}
  this._msgRefresh("<li align=center><strong>Book(s) by author '" + myAuthor + "'" + remStatus + " removed from library</strong></li>");
  this._currentState();
  $(".a-srch")[0].reset();   // reset input box
};

library.prototype._getBookByTitle = function(){
  var myTitle = document.getElementById("gbbt").value;
  var myBookArray = this.getBookByTitle(myTitle);
  this._msgRefresh("<li align=center><strong>Book names containing '" + myTitle + "':</strong></li>");
  for (var i=0;i<myBookArray.length;i++) { this._appendBookData(myBookArray[i],".b-srch");  };
};

library.prototype._getBooksByAuthor = function(){
  var myAuthor = document.getElementById("gbba").value;
  var myBookArray = this.getBooksByAuthor(myAuthor);
  this._msgRefresh("<li align=center><strong>Book(s) by author name containing '" + myAuthor + "':</strong></li>");
  for (var i=0;i<myBookArray.length;i++) { this._appendBookData(myBookArray[i],".a-srch");  };
};

library.prototype._getBookInfo = function(){
  var mySearch = document.getElementById("gbi").value;
  var myBookArray = this.getBookInfo(mySearch);
  this._msgRefresh("<li align=center><strong>Library search for '" + mySearch + "':</strong></li>");
  for (var i=0;i<myBookArray.length;i++) { this._appendBookData(myBookArray[i],".m-srch");  };
};

library.prototype._libStore = function(){
  var remStatus = "";
  var stored = this.libStore();
  if (!stored) {remStatus = " NOT";}
  this._msgRefresh("<li align=center><strong>Library" + remStatus + " saved to local storage.</strong></li>");
};

library.prototype.addBooks = function(inputBookArray){   //****************** Add an array of books; ONLY USED IN CONSOLE
  var addCount = 0;
  if (typeof(inputBookArray) != "undefined" && inputBookArray.length >> 0) {
    var inputArrayLen = inputBookArray.length;
    for (var i = 0; (i < inputArrayLen); i++){ if (this.addBook(inputBookArray[i])) { addCount++; }; };
  };
  return addCount;
};

library.prototype.addBook = function(myBook){
  var isNewBook = true;
  var bookArrayLen = this.myBookArray.length;
  for(var i = 0; (i < bookArrayLen && isNewBook); i++) {
    if ((this.myBookArray[i].title == myBook.title)
      && (this.myBookArray[i].author == myBook.author)) { isNewBook = false; };
  };
  if (isNewBook) {
    if (this.validBookInfo(myBook)) {  this.myBookArray.push(myBook);  }
    else { isNewBook = false; };
  };
  return isNewBook;
};

library.prototype.validBookInfo = function(myBook){
  var goodInput = true;
  if ((typeof(myBook.title)!="string") && (typeof(myBook.title)!="number")) { goodInput = false; }
  else { if (typeof(myBook.publishDt) == "number") { myBook.title = myBook.title.toString(); }; };
  if (typeof(myBook.author) != "string") { goodInput = false; };
  if (typeof(myBook.pgCount) != "number" && typeof(myBook.pgCount) != "string") { goodInput = false; }
  else {  if (typeof(myBook.pgCount) == "string") {
            myBook.pgCount = Number(myBook.pgCount);
            if (isNaN(myBook.pgCount)) { goodInput = false; };
        };};
  if (typeof(myBook.publishDt) != "number" && typeof(myBook.publishDt) != "string"
        && typeof(myBook.publishDt) != "object") { goodInput = false; }
  else { if (isNaN(Date.parse(myBook.publishDt))) { goodInput = false; }
          else {
            if (typeof(myBook.publishDt) == "number") { myBook.publishDt = myBook.publishDt.toString(); };
            if (myBook.publishDt.length == 4) { myBook.publishDt = "1/1/"+myBook.publishDt; };
            myBook.publishDt = new Date(myBook.publishDt); // convert to js date format
            if (myBook.publishDt == "Invalid Date") { goodInput = false; };
        };};
  return goodInput;
};

library.prototype.removeBookByTitle = function(myTitle){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myTitle.toLowerCase() == this.myBookArray[i].title.toLowerCase()) {
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
  };};
  return booksRemoved;
};

library.prototype.removeBookByAuthor = function(myAuthor){
  var removalCount = 0;
  var bookMaxIndex = this.myBookArray.length-1;
  var booksRemoved = false;
  for (var i=bookMaxIndex; i>-1; i--) {  // move backwards through array so we don't have to adjust the index of the one to be deleted
    if (myAuthor.toLowerCase() == this.myBookArray[i].author.toLowerCase()) {
      this.myBookArray.splice(i, 1);  // take it out and shift the other elements
      removalCount++;
      booksRemoved = true;
  };};
  return booksRemoved;
};

library.prototype.getRandomBook = function(){
  if (this.myBookArray.length) {
    var randomIndex = Math.round(Math.random()*(this.myBookArray.length-1));
    return this.myBookArray[randomIndex];
  };
  return null;
};

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
  };};};
  return titleArray;
};

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
  };};};
  return authorArray;
};

library.prototype.getAuthors = function(){
  var authorArray = [];
  var authorArraySize = 0;
  var lookForAuthor;
  for (var i = 0; (i < this.myBookArray.length); i++){
    lookForAuthor = authorArray.indexOf(this.myBookArray[i].author);
    if (lookForAuthor==-1) {
      authorArray[authorArraySize] = this.myBookArray[i].author;
      authorArraySize++;
  };};
  return authorArray;
};

library.prototype.getRandomAuthorName = function(){
  var authArray = this.getAuthors();
  if (authArray.length) {
    var randomIndex = Math.round(Math.random()*(authArray.length-1));
    return authArray[randomIndex];
  };
  return null;
};

library.prototype.getBookInfo = function(queryString){  // search through entire element for string
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
  };};};
  return searchArray;
};

library.prototype.libStore = function() {
  var result = false;
  if(typeof(Storage) !== "undefined") {
    localStorage.storedArray = JSON.stringify(this.myBookArray);
    result = true;
  };
  return result;
};

library.prototype.libGet = function() {
  if(typeof(Storage) !== "undefined") {
    if (typeof(localStorage.storedArray) !== "undefined") {
      this.myBookArray = JSON.parse(localStorage.storedArray);
      for (var i=0;i<this.myBookArray.length;i++) {
        this.myBookArray[i].publishDt = new Date(this.myBookArray[i].publishDt);
      };
    };
  };
  return;
};

library.prototype.clearStorage = function() {
  if (typeof(localStorage.storedArray) !== "undefined") { localStorage.removeItem("storedArray"); };
  return;
};

var gLibrary = new library();
gLibrary.init();
gLibrary.libGet();
gLibrary._currentState();
