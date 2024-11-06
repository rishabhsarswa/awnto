
//window.addEventListener()
function a_body()
{
	//document.getElementById("logs").innerHTML="ok";
	//var bd = document.getElementById('body');
	//var logs = document.getElementById('logs');
	awnto_server_boot();
	
	awnto_server_require_login();
	a_loop();
	
	oncaptcha_refresh_button();
	//a_loop_bg();
	
	
}

function a_loop()
{
	// function runs on setup loop
	
	//logs.innerHTML="size " + window.innerWidth + "/" + window.innerHeight ;
	
	
	set_login_box();
	user_check_free();
	user_check_pass_free();
	
	awnto_server_loop();
	
	setTimeout(a_loop,100);
}

var dbx_la_username = "" ;
function user_check_free()
{
	var login_message = document.getElementById("login_message");
	var login_uname = document.getElementById("login_uname");
	
	
	if( login_uname.value != "" && dbx_la_username != login_uname.value )
	{
		dbx_la_username = login_uname.value ;
		if( login_uname.value.length < 5 || login_uname.value.length > 20 )
		{
			document.getElementById("user_message").style.color="#550000" ;
			document.getElementById("user_message").innerHTML="username length 5 to 20" ;
			return 0 ;
			
		}
		loadXMLDoc_check_user(login_uname.value );
		return 0 ;
	}
	if( login_uname.value == "" )
	{
		document.getElementById("user_message").innerHTML="" ;
	}
	
}
function user_check_pass_free()
{
	
	var login_password = document.getElementById("login_password");
	var login_password2 = document.getElementById("login_password2");
	
	if( login_password.value == "" || login_password2.value == "" )
	{
		document.getElementById("pass_message").innerHTML="" ;
		return 0 ;
	}
	
	if( login_password.value.length < 8 || login_password.value.length > 20 )
	{
		document.getElementById("pass_message").style.color="#550000" ;
		document.getElementById("pass_message").innerHTML="password length 8 to 20" ;
		return 0 ;
			
	}
	
	if( login_password.value == login_password2.value )
	{
		document.getElementById("pass_message").style.color="#005500";
		document.getElementById("pass_message").innerHTML="passwords match" ;
	}
	else
	{
		document.getElementById("pass_message").style.color="#550000";
		document.getElementById("pass_message").innerHTML="passwords do not match" ;
	}
	
	
}

function set_login_box()
{
	
	var lbx = document.getElementById('login_box');
	//var lbxstyle=""; 
	
	//var fix_hi = 700 ; // hight of box form
	var fix_hi = lbx.scrollHeight ; // height of form
	var fix_wi = 400 ;
	
	
	if( window.innerWidth  < fix_wi )
	{
		//lbxstyle += "width:" + window.innerWidth + ";" ;
		lbx.style.width = window.innerWidth ;
		lbx.style.left=0;
	}
	else 
	{
		lbx.style.width = fix_wi ;
		lbx.style.left= (window.innerWidth - fix_wi )/2 ;
	}
	if( window.innerHeight  < fix_hi )
	{
		//lbxstyle += "width:" + window.innerWidth + ";" ;
		lbx.style.height = window.innerHeight ;
		lbx.style.top=0;
		lbx.style.overflowY="scroll";
	}
	else 
	{
		lbx.style.height = fix_hi ;
		lbx.style.top= (window.innerHeight - fix_hi )/2 ;
		lbx.style.overflow="visible";
	}
	
	//lbx.style=lbxstyle ;

}

function onsignup_button()
{
	var login_message = document.getElementById("login_message");
	var login_uname = document.getElementById("login_uname");
	var login_good_name = document.getElementById("login_good_name");
	var login_password = document.getElementById("login_password");
	var login_password2 = document.getElementById("login_password2");
	var login_captcha = document.getElementById("captcha_box");
	
	if( login_good_name.value == "" )
	{
		login_message.innerHTML = "Good name should not be empty" ;
		return 0 ;
	}
	if( login_uname.value == "" )
	{
		login_message.innerHTML = "Username should not be empty" ;
		return 0 ;
	}
	if( login_password.value == "" )
	{
		login_message.innerHTML = "Password should not be empty" ;
		return 0 ;
	}
	if( login_password.value != login_password2.value )
	{
		login_message.innerHTML = "Passwords do not match" ;
		return 0 ;
	}
	if( login_password.value.length < 8 || login_password.value.length > 20 )
	{
	
		login_message.innerHTML="Password length 8 to 20" ;
		return 0 ;
			
	}
	if( login_captcha.value == "" )
	{
		login_message.innerHTML = "Enter Captcha" ;
		//return 0 ;
	}
	
	login_message.innerHTML = "connecting" ;
	
	loadXMLDoc(login_uname.value,login_password.value,login_good_name.value,login_captcha.value);

}


async function loadXMLDoc(uname,pass,good_name,captcha) 
{
	var login_message = document.getElementById("login_message");
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";"   ;
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	//login_message.innerHTML="ok";
      	if(obj.err == 0 )
      	{
      		login_message.innerHTML = "sign done redirecting to homepage" ;
      		awnto_server_login(obj.awnto_user,obj.awnto_user_key);
      		//window.location='profile.html';
      		awnto_server_loop_web_redirect='profile.html';
      	}
      	else
      	{
      	
      		login_message.innerHTML = "sign err "+obj.err+ " ; msg : " +obj.err_msg ;
      		oncaptcha_refresh_button() ;
      	}
    }
    else
    {
   	 login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    
    }
  };
  xhttp.open("POST", awnto_server+"/new_register.php", true);
  
   xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	
data.append('user', uname);
//data.append('pass', CryptoJS.MD5(CryptoJS.MD5(pass)));
//data.append('pass', pass );
data.append('pass', pass);

data.append('name', good_name );
data.append('captcha', captcha );

data.append('awnto_session_id', awnto_session_id );

  var ret_form=await awnto_enc_send(form,data);
	
  	xhttp.send(ret_form);
}


async function loadXMLDoc_check_user(uname) 
{
	var login_message = document.getElementById("user_message");
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";"  ;
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	//login_message.innerHTML="ok";
      	if(obj.err == 0 )
      	{
      		login_message.style.color="#005500";
      		login_message.innerHTML = "username available" ;
      	}
      	else
      	{
      		login_message.style.color="#550000";
      		login_message.innerHTML = obj.err_msg ;
      	}
    }
    else
    {
   	 login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    
    }
  };
  xhttp.open("POST", awnto_server+"/user_check.php", true);
  
   xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	
data.append('user', uname);
//data.append('pass', CryptoJS.MD5(CryptoJS.MD5(pass)));
//data.append('pass', pass );
  
 
  var ret_form=await awnto_enc_send(form,data);
	
  	xhttp.send(ret_form);
}





