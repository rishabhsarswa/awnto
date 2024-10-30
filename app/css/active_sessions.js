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

function awnto_sessions_signout_by_key_id(x)
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	//login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" + this.responseText  ;
      	//const obj = JSON.parse(this.responseText);
      	//login_message.innerHTML="ok";
      	
      	awnto_server_require_session();
      	awnto_server_check_profile_loadXMLDoc();
      	//alert(awnto_listCookies());
    }
    else
    {
   	 //login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    	//window.location='error.html?state='+this.readyState+'&status='+this.status;
    	if (this.readyState == 4)
    	{
    		window.location='error.html?state='+this.readyState+'&status='+this.status;
    		//alert('state='+this.readyState+';status='+this.status);
    	}
    }
  };
  xhttp.open("POST", awnto_server+"/signout.php?q=by_key_id&key_id="+x, true);
  
  //awnto_setCookie('awnto_user',"rishu",365);
  //username = prompt("Please enter your name:", "");
  //alert( awnto_getCookie('awnto_user'));
  
  var data = new FormData();
  	if(awnto_getCookie('awnto_app_user')!="")
		data.append('awnto_user', awnto_getCookie('awnto_app_user'));
	//data.append('awnto_user_key', "1234");
	if(awnto_getCookie('awnto_app_user_key')!="")
		data.append('awnto_user_key', awnto_getCookie('awnto_app_user_key'));
//data.append('pass', CryptoJS.MD5(CryptoJS.MD5(pass)));
//data.append('pass', pass );
//data.append('pass', CryptoJS.MD5(pass));

//data.append('captcha', captcha );
  
  xhttp.send(data);
}
function awnto_sessions_signout_all_other()
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	//login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" + this.responseText  ;
      	//const obj = JSON.parse(this.responseText);
      	//login_message.innerHTML="ok";
      	
      	awnto_server_require_session();
      	awnto_server_check_profile_loadXMLDoc();
      	//alert(awnto_listCookies());
    }
    else
    {
   	 //login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    	//window.location='error.html?state='+this.readyState+'&status='+this.status;
    	if (this.readyState == 4)
    	{
    		window.location='error.html?state='+this.readyState+'&status='+this.status;
    		//alert('state='+this.readyState+';status='+this.status);
    	}
    }
  };
  xhttp.open("POST", awnto_server+"/signout.php?q=all_other", true);
  
  //awnto_setCookie('awnto_user',"rishu",365);
  //username = prompt("Please enter your name:", "");
  //alert( awnto_getCookie('awnto_user'));
  
  var data = new FormData();
  	if(awnto_getCookie('awnto_app_user')!="")
		data.append('awnto_user', awnto_getCookie('awnto_app_user'));
	//data.append('awnto_user_key', "1234");
	if(awnto_getCookie('awnto_app_user_key')!="")
		data.append('awnto_user_key', awnto_getCookie('awnto_app_user_key'));
//data.append('pass', CryptoJS.MD5(CryptoJS.MD5(pass)));
//data.append('pass', pass );
//data.append('pass', CryptoJS.MD5(pass));

//data.append('captcha', captcha );
  
  xhttp.send(data);
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
      		document.getElementById("awnto_profile_user_key_id").innerHTML=obj.user_current_key_id;
      		//alert(this.responseText);
      		
      		var awnto_active_sesstion_table="<table><tr><th>SNo</th><th>Key ID</th><th>Created Date</th><th>Action</th></tr>";
      		for( var i = 0 ; i < obj.user_current_keys_total ; i++ )
      		{
      			awnto_active_sesstion_table+="<tr>";
      			awnto_active_sesstion_table+="<td>"+(i+1)+"</td>";
      			awnto_active_sesstion_table+="<td>"+obj.user_current_keys_id[i]+"</td>";
      			awnto_active_sesstion_table+="<td>"+obj.user_current_keys_id_gen_time[i]+"</td>";
      			awnto_active_sesstion_table+="<td><button onclick=\"awnto_sessions_signout_by_key_id('"+obj.user_current_keys_id[i]+"');\">Sign Out</button></td>";
      			awnto_active_sesstion_table+="</tr>";
      		}
      		awnto_active_sesstion_table+="</table>";
      		document.getElementById("awnto_profile_active_sessions_table").innerHTML=awnto_active_sesstion_table;
      		//window.location='profile.html';
      	}
      	else
      	{
      		
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
  xhttp.open("POST", awnto_server+"/active_sessions.php", true);
  
  
  var data = new FormData();
  	if(awnto_app_user != "")
		data.append('awnto_user', awnto_app_user );
	//data.append('awnto_user_key', "1234");
	if( awnto_app_user_key !="")
		data.append('awnto_user_key', awnto_app_user_key );
  
  xhttp.send(data);
}


