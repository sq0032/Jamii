{
	"container":
		"<div id='dropbox-upload'></div>
		<button id='google-drive-btn'>Google Drive</button>
		<div id='sharedfile-container-header'>
			<a id='sharedfile-name'><span>Name</span></a>
			<a id='sharedfile-datetime'><span>Date</span></a>
			<a id='sharedfile-uploader'><span>Uploader</span></a>
			<div class='clear'></div>
		</div>
		<ol id='file-links'>
		</ol>",
	"file-link":
		"<li class='file-link'>
			<div class='file-name'>
				<img class='file-icon' src='<%= file.get('icon') %>'>
				<a href='<%= file.get('link') %>'><%= file.get('name') %></a>
			</div>
			<div class='file-update-datetime'>
				<%= datetime.getHours() %>:<%= datetime.getMinutes() %> <%= datetime.toDateString() %>
			</div>
			<div class='file-uploader'>
				<%= file.get('uploader') %>
			</div>
			<div class='clear'></div>
		</li>"
}