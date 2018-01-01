//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//save bookmark
function saveBookmark(e){
	//get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

	//save as array of objects when submitting to local storage
	var bookmark = {
		name:siteName,
		url:siteUrl
	}

	console.log(bookmark);
	
	//prevent from from submitting
	e.preventDefault();

}
