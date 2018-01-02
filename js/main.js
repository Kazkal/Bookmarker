//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
	//get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	//save as array of objects when submitting to local storage
	var bookmark = {
		name:siteName,
		url:siteUrl
	}

	//local storage only stores strings
	//localstorage test
	//localStorage.setItem('test','Hello World');
	//console.log(localStorage.getItem('test'));
	//want to save bookmark we've created in local storage, 
	//check if already exists - wil  have to fetch it, add to it and save it again
	if (localStorage.getItem('bookmarks')===null){
		//initialsie an array
		var bookmarks=[];
		bookmarks.push(bookmark);		//add to array

		//set to localstorage, save as string b4 saving
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	} else {
		//fetch from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//reset back to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();


	//re-fetch bookmarks
	fetchBookmarks();

	//prevent from from submitting
	e.preventDefault();
}
//Delete bookmarks
function deleteBookmark(url){
	// get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for (var i=0; i< bookmarks.length; i++){
		if (bookmarks[i].url==url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//reset back to local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();
}


//fetch bookmarks to display
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	//get output id
	console.log(bookmarks);

	var bookmarksResults=document.getElementById('bookmarksResults');
	//build output
	bookmarksResults.innerHTML='';

	//loop thro bookmarks in localstorage
	for (var i =0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" href="'+url+'">Visit</a> ' +
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a> ' +
										'</h3>'+
										'</div>';
	}
}



function validateForm(siteName, siteUrl){
	if (!siteName|| !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	//expression to format a url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
	return true;





}