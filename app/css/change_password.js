
//window.addEventListener()

function a_body()
{
	//document.getElementById("logs").innerHTML="ok";
	//var bd = document.getElementById('body');
	//var logs = document.getElementById('logs');
	
	awnto_server_boot();
	awnto_server_require_session();
	//a_loop_bg();
	
	
	oncaptcha_refresh_button();
	a_loop();
	
}

function a_loop()
{
	// function runs on setup loop
	
	//logs.innerHTML="size " + window.innerWidth + "/" + window.innerHeight ;
	
	
	set_login_box();
	//user_check_free();
	//user_check_pass_free();
	awnto_server_loop();
	
	setTimeout(a_loop,100);
}
function redirect_to_profile()
{
	awnto_server_loop_web_redirect='profile.html' ;
}
function set_login_box()
{
	
	var lbx = document.getElementById('login_box');
	//var lbxstyle=""; 
	
	//var fix_hi = 600 ; // hight of box form
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

function onsubmit_button()
{
	var login_message = document.getElementById("login_message");
	var login_cpassword = document.getElementById("login_cpassword");
	var login_password = document.getElementById("login_password");
	var login_password2 = document.getElementById("login_password2");
	var login_captcha = document.getElementById("captcha_box");
	
	if( login_cpassword.value == "" )
	{
		login_message.innerHTML = "Current Password should not be empty" ;
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
	
	loadXMLDoc(login_cpassword.value,login_password.value,login_password2.value,login_captcha.value);

}


async function loadXMLDoc(cpass,pass,pass2,captcha) 
{
	var login_message = document.getElementById("login_message");
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" ;
    	
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	//login_message.innerHTML="ok";
      	
      	if(obj.err == 0 )
      	{
      		login_message.innerHTML = "Password Updated Successfully ; Redirecting to Home" ;
      		//window.location='../php/redirect.php?url=../pg/profile.php&t=3&mq=\"password changed done\"';
      		//awnto_server_loop_web_redirect='profile.html' ;
      		setTimeout(redirect_to_profile,2000);
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
  xhttp.open("POST", awnto_server+"/change_pass.php", true);
  
   xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	
data.append('cpass', cpass);;
data.append('pass', pass);
data.append('captcha', captcha );

data.append('awnto_session_id', awnto_session_id );


  	if(awnto_app_user != "")
		data.append('awnto_user', awnto_app_user );
	//data.append('awnto_user_key', "1234");
	if( awnto_app_user_key !="")
		data.append('awnto_user_key', awnto_app_user_key );
  
  
 	var ret_form=await awnto_enc_send(form,data);
  	xhttp.send(ret_form);
}







