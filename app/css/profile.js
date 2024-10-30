function a_body()
{
	
	awnto_server_boot();
	awnto_server_require_session();
	awnto_server_check_profile_loadXMLDoc();
	a_loop();
}

function a_loop()
{
	// function runs on setup loop
	
	//logs.innerHTML="size " + window.innerWidth + "/" + window.innerHeight ;
	
	awnto_server_loop();
	
	setTimeout(a_loop,100);
}


function awnto_server_check_profile_loadXMLDoc() 
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	//login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" + this.responseText  ;
      	const obj = JSON.parse(this.responseText);
      	//login_message.innerHTML="ok";
      	
      	if(obj.err == 0 )
      	{
      		//login_message.innerHTML = "sign done redirecting to homepage" ;
      		document.getElementById("awnto_profile_user_name").innerHTML=obj.user_name;
      		document.getElementById("awnto_profile_user_uname").innerHTML=obj.user_uname;
      		document.getElementById("awnto_profile_user_bname").innerHTML=obj.user_bname;
      		//window.location='profile.html';
      	}
      	else
      	{
      		
      		//alert(this.responseText);
      	}
      	
      	//alert(awnto_listCookies());
    }
    else
    {
    	//
   	 //login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    	//window.location='error.html?state='+this.readyState+'&status='+this.status;
    	
    }
  };
  xhttp.open("POST", awnto_server+"/profile.php", true);
  
  var data = new FormData();
  	
  	if(awnto_app_user != "")
		data.append('awnto_user', awnto_app_user );
	//data.append('awnto_user_key', "1234");
	if( awnto_app_user_key !="")
		data.append('awnto_user_key', awnto_app_user_key );
  
  xhttp.send(data);
}


