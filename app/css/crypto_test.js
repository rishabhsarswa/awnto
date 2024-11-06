
async function test() {
  try {
    // Create a key pair and use destructuring assignment to assign to variables
    let keyPair = await window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"],
);
    if (!("TextEncoder" in window)) 
  alert("Sorry, this browser does not support TextEncoder...");
    var pubKey_spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    var priKey_spki = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
                                        
   var encoded = String.fromCharCode.apply(null, new Uint8Array(pubKey_spki));
var asciiPublicKey = window.btoa(encoded);
var x509key = [
  "-----BEGIN PUBLIC KEY-----",
  asciiPublicKey.replace(/(.{80})/g, "$1\n"),
  "-----END PUBLIC KEY-----"
].join("\n");
var pubKey=x509key;
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function() {
  if (this.readyState == 4 && this.status == 200)
  {
      data_loaded=this.response;
    var enxd2 = await window.crypto.subtle.decrypt("RSA-OAEP",keyPair.privateKey, data_loaded);
    var dnc2 = new TextDecoder("utf-8");
   var datax2 = dnc2.decode(enxd2);
      //alert("\""+datax2+"\"");
    }
  };
  xhttp.open("POST", awnto_server+"/crypto_check2.php", true);
  xhttp.responseType = "arraybuffer";
  var data = new FormData();
  var imported_server_pubkey= await awnto_spki_importPublicKey(awnto_server_pubkey_spki);
  
	var enc = new TextEncoder(); // always utf-8
	//JSON.stringify(pubKey)
	
	var tmp = new crypto_return();
	tmp.set("demo","awnto");
	//tmp.set("test",JSON.stringify(pubKey));
	//tmp.set("test",pubKey);
	var return_string=JSON.stringify(tmp) ;
	//console.log(enc.encode(return_string));
	//return_string="Welcome to Awnto" ;
	var enndata = enc.encode(return_string);
	//var enndata2 = str2ab(return_string);
	//alert(JSON.stringify(pubKey));
        var enxc = await window.crypto.subtle.encrypt("RSA-OAEP",imported_server_pubkey, enndata);
        //var encc = window.btoa(enxc);
    	var blob = new Blob( [enxc],{type: "application/octet-stream" });
    	//var blob2 = new Blob( [enndata],{type: "application/octet-stream" });
    	//var blobfile = new File([blob],'enc_data');
	data.append("enc_data", blob );
	data.append('enPubKey',JSON.stringify(pubKey));
  	xhttp.send(data);
   
  } catch (error) {
    alert(error);
  }
}

