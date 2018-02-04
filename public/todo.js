window.onload = getTask();

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		var txt = this.parentElement.innerText.substr(0, this.parentElement.innerText.length - 2);
		var div = this.parentElement;

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","deleteTask.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("task="+txt); 

		div.style.display = "none";
	}
}

// Create a new list item when clicking on the "Add" button
function newElement() {
	var li = document.createElement("li");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);

	if (inputValue === '') {
		alert("Champs vide !");
	} else {

		document.getElementById("myUL").appendChild(li);

		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","addTask.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("task="+inputValue); 
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
                        
                        $.ajax({
                            type: "POST",
                            url: "deleteTask.php",
                            data: "task="+inputValue
                        });
                        
                        
			//xmlhttp = new XMLHttpRequest();
			//xmlhttp.open("POST","deleteTask.php",true);
			//xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			//xmlhttp.send("task="+inputValue); 

			var div = this.parentElement;
			div.style.display = "none";
		}
	}
	location.reload();
}

function getTask() {
        
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","getTask.php",false);
	xmlhttp.send();

	json = JSON.parse(xmlhttp.responseText);

	for (var i = json.length - 1; i >= 0; i--) {
		var li = document.createElement("li");
		var t = document.createTextNode(json[i][1]);
		li.appendChild(t);		
		document.getElementById("myUL").appendChild(li);
	}
}

