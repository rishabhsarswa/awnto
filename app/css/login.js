
//window.addEventListener()
var awnto_session_id="";
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
	
	
	awnto_server_loop();
	
	setTimeout(a_loop,100);
}



function set_login_box()
{
	
	var lbx = document.getElementById('login_box');
	//var lbxstyle=""; 
	
	//var fix_hi = 550 ; // height of form
	var fix_hi = lbx.scrollHeight ; // height of form
	var fix_wi = 400 ;
	
	//console.log(lbx.scrollHeight);
	
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

function onlogin_button()
{
	var login_message = document.getElementById("login_message");
	var login_uname = document.getElementById("login_uname");
	var login_password = document.getElementById("login_password");
	var login_captcha = document.getElementById("captcha_box");
	
	if( login_uname.value == "" )
	{
		login_message.innerHTML = "username should not be empty" ;
		return 0 ;
	}
	if( login_password.value == "" )
	{
		login_message.innerHTML = "password should not be empty" ;
		return 0 ;
	}
	
	login_message.innerHTML = "connecting" ;
	
	loadXMLDoc(login_uname.value,login_password.value,login_captcha.value);

}



function oncaptcha_refresh_button_old()
{
	oncaptcha_refresh_button_i++ ;
	var login_captcha = document.getElementById("captcha_img") ;
	login_captcha.src=awnto_server+"/captcha.php?awnto_session_id="+awnto_session_id+"&i="+ oncaptcha_refresh_button_i ;
	var login_captcha = document.getElementById("captcha_box").value="" ;

}

async function loadXMLDoc(uname,pass,captcha) 
{
	var login_message = document.getElementById("login_message");
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	login_message.innerHTML = "connection done " +  this.readyState+":"+ this.status + ";"  ;
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	//alert(await awnto_enc_get(this.response));
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
  xhttp.open("POST", awnto_server+"/login_check.php", true);
  
   	xhttp.responseType = "arraybuffer";
  	var data = new crypto_return();
  	var form = new FormData();
  	
data.append('user', uname);
data.append('pass', pass);
data.append('captcha', captcha );
data.append('awnto_session_id', awnto_session_id );

 	var ret_form=await awnto_enc_send(form,data);
  	xhttp.send(ret_form);
}





