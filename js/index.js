var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var bookMark = [];

// Load existing bookmarks from localStorage
if (localStorage.getItem("Bookmarks") !== null) {
    bookMark = JSON.parse(localStorage.getItem("Bookmarks"));
    displaySites();
}

function addSite() {
    var site = {
        name: siteName.value,
        url: siteURL.value
    };

    
    if (!validateInput(site.name, site.url)) {
        return; 
    }

  
    bookMark.push(site);


    localStorage.setItem("Bookmarks", JSON.stringify(bookMark));


    document.getElementById('siteName').value = '';
    document.getElementById('siteURL').value = '';


    displaySites();
}


function validateInput(name, url) {
    
    if (name.length < 3) {
        alert('Please enter a site name with at least 3 characters.');
        return false;
    }

   
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    if (!urlPattern.test(url)) {
        alert('Please enter a valid URL starting with http or https.');
        return false;
    }

    return true;
}


function displaySites() {
    var cartona = "";
    for (var i = 0; i < bookMark.length; i++) {
        cartona += `  
        <tr>
            <td>${i + 1}</td>
            <td>${bookMark[i].name}</td>
            <td><a class="btn btn-visit" href="${bookMark[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("allSiteBody").innerHTML = cartona;
}

function deleteSite(index) {
    bookMark.splice(index, 1);
    localStorage.setItem("Bookmarks", JSON.stringify(bookMark));
    displaySites();
}


function clear() {
    siteName.value = null;
    siteURL.value = null;
}
