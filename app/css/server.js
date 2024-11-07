
//var awnto_server="http://127.0.0.1:7180/api" ;
var awnto_server = "https://remote.awnto.com/xgate_site/api";

var awnto_server_loop_web_redirect="";
var awnto_session_id="";
var awnto_app_user="";
var awnto_app_user_key="";
//var is_data_booted=0;

async function awnto_server_boot()
{

	//awnto_session_id=CryptoJS.MD5(Math.random());
	var i_random=""+Date.now()+"_"+Math.floor( Math.random()*1024*1024*1024 );
	awnto_session_id=""+CryptoJS.MD5(i_random);
	//alert(Date.now());
	//console.log(awnto_session_id);
	/*
	if(awnto_getCookie('awnto_app_user')!="")
		awnto_app_user=awnto_getCookie('awnto_app_user');
	//data.append('awnto_user_key', "1234");
	if(awnto_getCookie('awnto_app_user_key')!="")
		awnto_app_user_key=awnto_getCookie('awnto_app_user_key');
	//alert(i_random + ";" + CryptoJS.MD5(i_random) );
	*/
	if (localStorage && 'awnto_app_user' in localStorage) {
    		awnto_app_user = localStorage.awnto_app_user;
  	}
  	if (localStorage && 'awnto_app_user_key' in localStorage) {
    		awnto_app_user_key = localStorage.awnto_app_user_key;
  	}
  	
  	awnto_enc_boot();
  	//test();
  	//console.log(localStorage);
  	/*
 	while(is_data_booted==0)
  	{
 		await new Promise(r => setTimeout(r, 2000));
  	}*/

}
function awnto_server_login(user,key)
{
	localStorage && (localStorage.awnto_app_user = user);
	localStorage && (localStorage.awnto_app_user_key = key);
      		//awnto_setCookie('awnto_app_user',user,30);
		//awnto_setCookie('awnto_app_user_key',key,30);
}
function awnto_server_loop()
{

	if(awnto_server_loop_web_redirect != "")
	{
		//alert(awnto_server_loop_web_redirect);
		window.location=awnto_server_loop_web_redirect;
	}

}
function awnto_server_require_login()
{

	awnto_server_require_login_loadXMLDoc();

}
function awnto_server_require_session()
{

	awnto_server_require_session_loadXMLDoc();

}
function awnto_server_signout(x)
{
	
	awnto_server_require_signout_loadXMLDoc(x);
}




var awnto_server_pubkey_spki=`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkMT80RVwoYX19sQbBW7uajlFj
AjU/8wjAcfWJpSDnw2nDJw7JRtaXrMCwxFENVyfkDlzVIY+H6osiiyaMbpC0nNYq
GNkz9XhvqTBt83aGrwFFXArbudps1V7eGKoCQNqjlFFGpI9H+SAUek/jpdu+RzX7
DF/dnqzHejteJFWKswIDAQAB
-----END PUBLIC KEY-----`;





class crypto_return
{
	/*
	constructor()
	{
		this.total=0;
	}
	*/
	append(name,value)
	{
		this[name]=value ;
		//this.total++;
	}
	set(name,value)
	{
		this[name]=value ;
		//this.total++;
	}
	get(name,)
	{
		return this[name] ;
	}
}


async function awnto_jwk_importPublicKey(key) {
  return await window.crypto.subtle.importKey(
    "jwk",             // The format of the key to be imported (SubjectPublicKeyInfo)
    key,               // The public key data
    {
      name: "RSA-OAEP", // The algorithm the imported key will be used with
      hash: "SHA-256",  // The hash function to be used with the algorithm
    },
    true,               // Whether the key is extractable
    ["encrypt"]         // The intended use for the key (encryption in this case)
  );
}

async function awnto_spki_importPublicKey(spkiPem) {       
    return await window.crypto.subtle.importKey(
        "spki",
        getSpkiDer(spkiPem),
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"]
    );
}

function getSpkiDer(spkiPem){
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    var pemContents = spkiPem.substring(pemHeader.length, spkiPem.length - pemFooter.length);
    var binaryDerString = window.atob(pemContents);
    return str2ab(binaryDerString); 
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


var keyPair_wt = window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"],
);

async function awnto_enc_boot()
{

	var keyPair = await keyPair_wt ;
    
   
   
   
   
   //is_data_booted=1;
}

async function awnto_enc_send(form,crypto_ret)
{
	var keyPair = await keyPair_wt ;

	if (!("TextEncoder" in window)) 
  alert("Sorry, this browser does not support TextEncoder...");
    var pubKey_spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    //var priKey_spki = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
                                        
   var encoded = String.fromCharCode.apply(null, new Uint8Array(pubKey_spki));
var asciiPublicKey = window.btoa(encoded);
var x509key = [
  "-----BEGIN PUBLIC KEY-----",
  asciiPublicKey.replace(/(.{80})/g, "$1\n"),
  "-----END PUBLIC KEY-----"
].join("\n");
 var pubKey=x509key;

	//var awnto_imported_server_pubkey = await awnto_spki_importPublicKey(awnto_server_pubkey_spki);

	var imported_server_pubkey = await awnto_spki_importPublicKey(awnto_server_pubkey_spki);
	//alert(awnto_server_pubkey_spki);
	//var tmp = new crypto_return();
	//tmp.set("demo","awnto");
	//alert(JSON.stringify(crypto_ret));
	crypto_ret.set('enPubKey',pubKey);
	var return_string=JSON.stringify(crypto_ret) ;
	//alert(JSON.stringify(crypto_ret));
	//alert("return lenth:"+return_string.length+";");
	//var enc = new TextEncoder(); // always utf-8
	//var enndata = enc.encode(btoa(return_string));
	//var blob = new Blob([return_string], { type : "application/octet-stream" });
	var return_strings=split_string_partwise(return_string, 32 ) ;
	var enxc=[];
	//var enxcr=[];
	for (var i=0, len=return_strings['all'] ; i < len ; i++) 
    	{
	 	enxc[i] = await window.crypto.subtle.encrypt({ name:"RSA-OAEP" },imported_server_pubkey, stringToArrayBuffer(return_strings[i]));
	 	//appendBuffer(buffer1, buffer2)
	 	
    	}
    	//enxcr=[enxc[0],enxc[1],enxc[2]];
 	//var enxcx = await window.crypto.subtle.encrypt({ name:"RSA-OAEP" },imported_server_pubkey, return_strings);
    	var blobc = new Blob( enxc,{type: "application/octet-stream" });
    	//var form = new FormData();
	form.append("enc_data", blobc );
	//form.append('enPubKey',JSON.stringify(pubKey));
  	return await form;
}
function stringToArrayBuffer(str){
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function appendBuffer(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
};
function split_string_partwise(str,n){
    
    var varis = [];
    var buf_all=0;
    var ixt=0 ;
    var ixm=0 ;
    var buoverfolw=n ;
    for (var i=0, strLen=str.length; i<strLen; i++) 
    {
    	 if(ixt==buoverfolw)
    	{
    		ixt=0 ;
    		ixm++ ;
    		//buf['all']=ixm ;
    	}
    	if(ixt==0)
    	{
    		var buffl=str.length - ixm*buoverfolw ;
    		if(buffl>buoverfolw)
    			buffl=buoverfolw ;
    		buf_all=ixm +1 ;
    		varis[ixm]="";
    		
    	}
        varis[ixm]+=String.fromCharCode(str.charCodeAt(i));
        
        ixt++ ;
    }
    //for (var i=0, len=buf_all ; i < len ; i++) 
    //{
     //	alert(varis[i]) ;
    //}
    varis['all']=buf_all;
    return varis;
}
//encrypt_partwise("shfilahelifglqeriagflaedfgqlwegfejkldgfvlbdflwselfvlkweflwefgbwledbfklsjdgbfvsgkjdfvbjksbfkjsdbjksbdjkfbsjkdb");
//encrypt_partwise("1234");
async function awnto_enc_get(ret)
{
	var keyPair = await keyPair_wt ;
	 data_loaded = ret;
    var enxd2 = await window.crypto.subtle.decrypt({ name:"RSA-OAEP" } , keyPair.privateKey, data_loaded);
    var dnc2 = new TextDecoder("utf-8");
   var datax2 = dnc2.decode(enxd2);
     return datax2 ;
  
}

function awnto_setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function awnto_getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function awnto_checkCookie() {
  let user = awnto_getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
function awnto_listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}
//setCookie("username", username, 365);

async function awnto_server_require_login_loadXMLDoc() 
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
  
  	//alert( await awnto_enc_get(this.response)) ;
  	
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	if(obj.err == 0 )
      	{
      		//login_message.innerHTML = "sign done redirecting to homepage" ;
      		awnto_server_loop_web_redirect='profile.html';
      	}
      	else
      	{
      		document.getElementById("awnto_server_loading_page").style.display="none";
      	}
      	
    }
    else
    {
    	if (this.readyState == 4)
    	{
    		document.getElementById("awnto_server_loading_page_cont").innerHTML="Loading Error <br>Try refreshing Page";
    	}
    }
  };
  xhttp.open("POST", awnto_server+"/auth_login_status.php", true);
  xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	//form.append('demo', awnto_app_user );
  	
  	if(awnto_app_user != "")
		data.set('awnto_user', awnto_app_user );
	if( awnto_app_user_key !="")
		data.set('awnto_user_key', awnto_app_user_key );
	//data.set('demox', "12345678901234567890");
	var ret_form=await awnto_enc_send(form,data);
	//alert(JSON.stringify(form.enPubKey));
	/*
	for (var p of ret_form) {
   	 	let name = p[0];
    		let value = p[1];

    		console.log(name, value)
	}
	*/
  	xhttp.send(ret_form);
}

async function awnto_server_require_session_loadXMLDoc() 
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	//login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" + this.responseText  ;
      	const obj = JSON.parse(await awnto_enc_get(this.response));
      	//login_message.innerHTML="ok";
      	
      	if(obj.err == 0 )
      	{
      		//login_message.innerHTML = "sign done redirecting to homepage" ;
      		document.getElementById("awnto_server_loading_page").style.display="none";
      		//window.location='profile.html';
      	}
      	else
      	{
      		window.location='login.html';
      		//awnto_server_loop_web_redirect='login.html';
      		//window.location='error.html';
      		//login_message.innerHTML = "sign err "+obj.err+ " ; msg : " +obj.err_msg ;
      		//oncaptcha_refresh_button() ;
      	}
      	//alert(awnto_listCookies());
    }
    else
    {
   	 //login_message.innerHTML = "connecting " +  this.readyState+":"+this.status ;
    	//window.location='error.html?state='+this.readyState+'&status='+this.status;
    	if (this.readyState == 4)
    	{
    		//window.location='error.html?state='+this.readyState+'&status='+this.status;
    		//alert('state='+this.readyState+';status='+this.status);
    		document.getElementById("awnto_server_loading_page_cont").innerHTML="Loading Error <br>Try refreshing Page";
    	}
    }
  };
  xhttp.open("POST", awnto_server+"/auth_login_status.php", true);
  
  //awnto_setCookie('awnto_user',"rishu",365);
  //username = prompt("Please enter your name:", "");
  //alert( awnto_getCookie('awnto_user'));
  
   xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	if(awnto_app_user != "")
		data.set('awnto_user', awnto_app_user );
	if( awnto_app_user_key !="")
		data.set('awnto_user_key', awnto_app_user_key );
	//data.set('demox', "12345678901234567890");
	var ret_form=await awnto_enc_send(form,data);
	
  	xhttp.send(ret_form);
}


async function awnto_server_require_signout_loadXMLDoc(x) 
{
	
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200) {
    //if ( this.readyState == 4) {
    	//login_message.innerHTML = "connection done " +  this.readyState+":"+this.status + ";" + this.responseText  ;
      	//const obj = JSON.parse(this.responseText);
      	//login_message.innerHTML="ok";
      	
      	awnto_server_require_session();
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
  xhttp.open("POST", awnto_server+"/signout.php?q="+x, true);
  
  //awnto_setCookie('awnto_user',"rishu",365);
  //username = prompt("Please enter your name:", "");
  //alert( awnto_getCookie('awnto_user'));
  
   xhttp.responseType = "arraybuffer";
  var data = new crypto_return();
  	var form = new FormData();
  	if(awnto_app_user != "")
		data.set('awnto_user', awnto_app_user );
	if( awnto_app_user_key !="")
		data.set('awnto_user_key', awnto_app_user_key );
	//data.set('demox', "12345678901234567890");
	var ret_form=await awnto_enc_send(form,data);
	
  	xhttp.send(ret_form);
}


var oncaptcha_refresh_button_i = 0 ;
function oncaptcha_refresh_button()
{
	oncaptcha_refresh_button_i++ ;
	var login_captcha = document.getElementById("captcha_img") ;
	login_captcha.src=awnto_server+"/captcha.php?awnto_session_id="+awnto_session_id+"&i="+ oncaptcha_refresh_button_i ;
	var login_captcha = document.getElementById("captcha_box").value="" ;

}


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();





/*
// PEM encoded X.509 key
const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkMT80RVwoYX19sQbBW7uajlFj
AjU/8wjAcfWJpSDnw2nDJw7JRtaXrMCwxFENVyfkDlzVIY+H6osiiyaMbpC0nNYq
GNkz9XhvqTBt83aGrwFFXArbudps1V7eGKoCQNqjlFFGpI9H+SAUek/jpdu+RzX7
DF/dnqzHejteJFWKswIDAQAB
-----END PUBLIC KEY-----`;

importPublicKeyAndEncrypt();
    
async function importPublicKeyAndEncrypt() {

    const plaintext = 'This text will be encoded UTF8 and may contain special characters like § and €.';
                
    try {
        const pub = await importPublicKey(publicKey);
        const encrypted = await encryptRSA(pub, new TextEncoder().encode(plaintext));
        const encryptedBase64 = window.btoa(ab2str(encrypted));
        console.log(encryptedBase64.replace(/(.{64})/g, "$1\n")); 
    } catch(error) {
        console.log(error);
    }
}

async function importPublicKey(spkiPem) {       
    return await window.crypto.subtle.importKey(
        "spki",
        getSpkiDer(spkiPem),
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"]
    );
}

async function encryptRSA(key, plaintext) {
    let encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        plaintext
    );
    return encrypted;
}

function getSpkiDer(spkiPem){
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    var pemContents = spkiPem.substring(pemHeader.length, spkiPem.length - pemFooter.length);
    var binaryDerString = window.atob(pemContents);
    return str2ab(binaryDerString); 
}

//
// Helper
//

// https://stackoverflow.com/a/11058858
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
    
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}


// PEM encoded PKCS#8 key
const privateKey = 
`-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6cXloNrocJ8sw
wj8xktPmEOTfTgJT7KkUwWIGOjBB1QxApgdn5+SUHsakvEJq3Fgn+FnuuN8cfcqW
rbT9jURtgNGinJNJ+StPM/PCxfhSv+XbkK11CV2EcJMyDB/8S/9u4E2ht/N1kT4O
F2/mVDAq2MjjeUMq8CLmQR63ZMXB8lwmsGJEl4Rwt9WBZNcZFCfuCeBYrKRS7mtL
zd4BTXEf0UuiNB/KJrz38TKSI47v/dRbB34wBNn0cuNLHb8t/eDaOvzV6J8SZgOW
uL85mng6Fm77QGjUteWgJN76+YhDZgJfsRq1Q67JAy3ZXDHi5X538DcM/o+0wYEq
kXxK3iIbAgMBAAECggEASlJj0ExIomKmmBhG8q8SM1s2sWG6gdQMjs6MEeluRT/1
c2v79cq2Dum5y/+UBl8x8TUKPKSLpCLs+GXkiVKgHXrFlqoN+OYQArG2EUWzuODw
czdYPhhupBXwR3oX4g41k/BsYfQfZBVzBFEJdWrIDLyAUFWNlfdGIj2BTiAoySfy
qmamvmW8bsvc8coiGlZ28UC85/Xqx9wOzjeGoRkCH7PcTMlc9F7SxSthwX/k1VBX
mNOHa+HzGOgO/W3k1LDqJbq2wKjZTW3iVEg2VodjxgBLMm0MueSGoI6IuaZSPMyF
EM3gGvC2+cDBI2SL/amhiTUa/VDlTVw/IKbSuar9uQKBgQDd76M0Po5Lqh8ZhQ3o
bhFqkfO5EBXy7HUL15cw51kVtwF6Gf/J2HNHjwsg9Nb0eJETTS6bbuVd9bn884Jo
RS986nVTFNZ4dnjEgKjjQ8GjfzdkpbUxsRLWiIxuOQSpIUZGdMi2ctTTtspvMsDs
jRRYdYIQCe/SDsdHGT3vcUCybwKBgQDXDz6iVnY84Fh5iDDVrQOR4lYoxCL/ikCD
JjC6y1mjR0eVFdBPQ4j1dDSPU9lahBLby0VyagQCDp/kxQOl0z2zBLRI4I8jUtz9
/9KW6ze7U7dQJ7OTfumd5I97OyQOG9XZwKUkRgfyb/PAMBSUSLgosi38f+OC3IN3
qlvHFzvxFQKBgQCITpUDEmSczih5qQGIvolN1cRF5j5Ey7t7gXbnXz+Umah7kJpM
IvdyfMVOAXJABgi8PQwiBLM0ySXo2LpARjXLV8ilNUggBktYDNktc8DrJMgltaya
j3HNd2IglD5rjfc2cKWRgOd7/GlKcHaTEnbreYhfR2sWrWLxJOyoMfuVWwKBgFal
CbMV6qU0LfEo8aPlBN8ttVDPVNpntP4h0NgxPXgPK8Pg+gA1UWSy4MouGg/hzkdH
aj9ifyLlCX598a5JoT4S0x/ZeVHd/LNI8mtjcRzD6cMde7gdFbpLb5NSjIAyrsIA
X4hxvpnqiOYRePkVIz0iLGziiaMbfMwlkrxvm/LRAoGBALPRbtSbE2pPgvOHKHTG
Pr7gKbmsWVbOcQA8rG801T38W/UPe1XtynMEjzzQ29OaVeQwvUN9+DxFXJ6Yvwj6
ih4Wdq109i7Oo1fDnMczOQN9DKch2eNAHrNSOMyLDCBm++wbyHAsS2T0VO8+gzLA
BviZm5AFCQWfke4LZo5mOS10
-----END PRIVATE KEY-----`;

importPrivateKeyAndDecrypt();
    
async function importPrivateKeyAndDecrypt() {

    // A ciphertext produced with the first code
    const ciphertextB64 = "q/g0YQ+CbFwCb9QxAeKk/X8vjUUKpBGCVe6OvFoBlTfRF24BQlWpLFhxVQv+Gn29CzAXfSJjU+C8taYXQ4wofyOaRx0etkATDbmIV1gVdxNnqVKTx2RSj1L3uACZ3aWYIGRjtaBMBNAW81mPEjxEWCvRW3uI/rOn3LAc4N05CkofOnsIpaafgcEjhZoTxp1Dpkm328bwRJ3g1Dn+vQk6JBiAXSiF7GHvMvnD6q+CQiO1dcv0lrrXlibE8/P2LHWpqQ9g5xWWUHl70q2WB+IxLgX9OkqX8XQ1GHjP5EaQFfo1HerBpa+Uf5DaienI/XT4n64DWM1S7t0dbhFDskc9HQ==";
        
    try {
        const priv = await importPrivateKey(privateKey);
        const decrypted = await decryptRSA(priv, str2ab(window.atob(ciphertextB64)));
        console.log(decrypted);
    } catch(error) {
        console.log(error);
    }
}

async function importPrivateKey(pkcs8Pem) {     
    return await window.crypto.subtle.importKey(
        "pkcs8",
        getPkcs8Der(pkcs8Pem),
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["decrypt"]
    );
}

async function decryptRSA(key, ciphertext) {
    let decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        ciphertext
    );
    return new TextDecoder().decode(decrypted);
}

function getPkcs8Der(pkcs8Pem){
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    var pemContents = pkcs8Pem.substring(pemHeader.length, pkcs8Pem.length - pemFooter.length);
    var binaryDerString = window.atob(pemContents);
    return str2ab(binaryDerString); 
}

//
// Helper
//
    
// https://stackoverflow.com/a/11058858
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
    
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

*/



