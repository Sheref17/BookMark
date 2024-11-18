var siteName = document.getElementById('siteName').value;
var siteURL = document.getElementById('siteURL').value;
function addSite() {



    if (!validateForm(siteName, siteURL)) {
        return;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    };


    let bookmarks = localStorage.getItem('bookmarks');
    bookmarks = bookmarks ? JSON.parse(bookmarks) : [];


    bookmarks.push(bookmark);


    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   
    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';

   
    clearBookmarks();
}


function deleteBookmark(index) {
 e
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    
    bookmarks.splice(index, 1);


    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function clearBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];


    var allSiteBody = document.getElementById('allSiteBody');


    allSiteBody.innerHTML = '';


    bookmarks.forEach((bookmark, index) => {
        allSiteBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td><a class="btn btn-visit" href="${bookmark.url}" target="_blank">Visit</a></td>
                <td><button class="btn btn-delete" onclick="deleteBookmark(${index})">Delete</button></td>
            </tr>
        `;
    });
}


function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill the fields in the right way sitename must be 3character or above and url must be in right way like https://www.facebook.com/.');
        return false;
    }
    

    var expression = /^(http|https):\/\/[^ "]+$/;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Please enter a valid URL.');
        return false;
    }

    return true;
}


document.addEventListener('DOMContentLoaded', fetchBookmarks);
