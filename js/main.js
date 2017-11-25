"use strict";

document.getElementById("myForm").addEventListener("submit", saveBookmarker);

function saveBookmarker(event) {
  // Take our input
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // Create new object
  const bookmark = {
    name: siteName,
    url: siteUrl
  };


  if (localStorage.getItem("bookmarks") === null) {
    // Init array
    let bookmarks = [];
    // Add to aray
    bookmarks.push(bookmark);
    // Set localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmarks to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Re-fetch bookmarks
  fetchBookmarks();

  // Reset form
  document.getElementById("myForm").reset();
  // Prevent form for submitting
  event.preventDefault();

};

// Bookmarks Delete
function bookmarksDelete(url) {
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();


};


// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  let bookmarksResult = document.getElementById("bookmarksResult");

  //Build output
  bookmarksResult.innerHTML = "";
  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResult.innerHTML += '<div class="well">' + '<h3>' + name +
      '<a class="btn btn-default" href="' + url + '"> Visit </a>' +
      '<a onclick="bookmarksDelete(\'' + url + '\')" class="btn btn-danger" href="#"> Delete </a>'
    '</h3>' +
      '</div>';

  }
}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
