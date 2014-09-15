{
	"container":
		"<div id='dropbox-upload'></div>
		<div id='sharedfile-container-header'>
			<a id='sharedfile-name'><span>Name</span></a>
			<a id='sharedfile-datetime'><span>Date</span></a>
			<a id='sharedfile-uploader'><span>Uploader</span></a>
			<div class='clear'></div>
		</div>
		<ol id='file-links'>
		</ol>",
	"file-link":
		"<div class='file-name'>
			<img class='file-icon' src='<%= file.icon %>'>
			<a href='<%= file.link %>'><%= file.name %></a>
		</div>
		<div class='file-update-datetime'>
			<%= datetime.getHours() %>:<%= datetime.getMinutes() %> <%= datetime.toDateString() %>
		</div>
		<div class='file-uploader'>
			<%= uploader.username %>
		</div>
		<div class='clear'></div>"
}