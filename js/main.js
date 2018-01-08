/*
  // an example of local storage it is part of html5 standerd
  localStorage.setItem('id','1980');
  console.log(localStorage.getItem('id'));
  localStorage.removeItem('id');
  localStorage.setItem('id',12);
  */

// Adding event on form submit
document.getElementById('boorkmarkForm').addEventListener('submit',saveBookmark);

function saveBookmark (event) {
  // preventing from to reload on submit
  event.preventDefault();
  var siteName=document.getElementById('site_name').value;
  var siteUrl=document.getElementById('site_url').value;

  if(!validateInputs(siteName,siteUrl)){
    return false;
  }
  // Okay so we are going to save bookmark as object so
  var bookmark={
    websiteName:siteName,
    websiteUrl:siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    
      // creating a local array
      var bookmarks=[];
      // pushing submited bookmark into array
      bookmarks.push(bookmark);
      // setting bookmark into localstorage after converting array object into string
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
      // refetching bookmarks to save effort of reloading
      fetchBookmarks();
    }else{

      // getting bookmark string
      var bookmarks = localStorage.getItem('bookmarks');
      // converting bookmark string into a json object
      var bookmark_object = JSON.parse(bookmarks);
      // adding the new bookmark into the localStorage object with key bookmarks
      bookmark_object.push(bookmark);
      // setting bookmarks back to localstorage
      localStorage.setItem('bookmarks',JSON.stringify(bookmark_object));
      // refetching bookmarks to save effort of reloading
      fetchBookmarks();  
    }
  // resetting the form after submission
  document.getElementById('boorkmarkForm').reset();
}

function fetchBookmarks () {
      // getting bookmark string
      var bookmarks = localStorage.getItem('bookmarks');
      // converting bookmark string into a json object
      var bookmark_object = JSON.parse(bookmarks);
      var bookmarkDiv = document.getElementById('bookmark_results');

      // using the most basic for loop
      // forEach,for of,for in can be used too
      /*
      for(var index in bookmark_object){
        console.log(bookmark_object[index]);
      }
      // for of loop introduced in ES6
      for(var bookmark of bookmark_object){
        console.log(bookmark);
      }
      bookmark_object.forEach(function (item) {
        console.log(item);
      })
      */
      bookmarkDiv.innerHTML = '';
      var name,url;
      for(var i=0;i<bookmark_object.length; i++){
        name = bookmark_object[i].websiteName;
        url = bookmark_object[i].websiteUrl;
        // using ES6 string litral
        // setting up the template when ever function is going to be called
        bookmarkDiv.innerHTML+=`<div class='well'>
        <h3>${name}</h3>
        <h5>${url}</h5>
        <a class='btn btn-default' target='_blank' href='${url}'>Visit site</a>
        <a class='btn btn-danger' href='#' onclick="deleteBookmark(\'${url}\')">Delete</a>
        </div>`;
        
      }
    }

    function deleteBookmark (burl) {
    // getting bookmark string
    var bookmarks = localStorage.getItem('bookmarks');
    // converting bookmark string into a json object
    var bookmark_object = JSON.parse(bookmarks);

    for(var i=0;i<bookmark_object.length; i++){
     if(burl==bookmark_object[i].websiteUrl){
          // splice is removing 1 object from given iteration number
          bookmark_object.splice(i,1);
        }

      }
    // setting bookmarks again
    var setBookmarks = JSON.stringify(bookmark_object);
    localStorage.setItem('bookmarks', setBookmarks);
    // refetching bookmarks to save effort of reloading
    fetchBookmarks();
  }
  function validateInputs (siteName,siteUrl) {
  // validation if any of the field is empty
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  // validation for url
  if (!siteUrl.match(regex)) {
    alert("Please enter the valid url!");
    return false
  }
  return true;
}