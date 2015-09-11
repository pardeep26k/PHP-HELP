 //Google Login constants
var google_options = {
        'callback': onSignInCallback,
        'approvalprompt': 'force',
        'apppackagename': 'com.phdmobi.imagesearch',
        'clientid': CONSTANT.CLIENT_ID,
        'requestvisibleactions': 'http://schemas.google.com/AddActivity',
        'scope': 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        'height': 'sort',
		'redirect_uri':'http://imagesearch.com.au/imagesearchyii/',
        'cookiepolicy': 'single_host_origin'
    };
	
function onSignInCallback(authResult) {
console.log(authResult);
	if (authResult['status']['signed_in']) {
        if ($("#myModal").css('display') == 'block') {
            window.location.hash = "loading";
        }
        //User granted access
        gapi.auth.setToken(authResult);
        //debug(gapi);
        gapi.client.load('plus', 'v1', loadProfile);
    } else {
        label = 'Access denied: ' + authResult['error'];
    }
    }
 function loadProfile(){
 console.log('loadprofile');
      var request = gapi.client.plus.people.get({'userId': 'me'});
    request.execute(loadProfileCallback);
    }
	//Google Load Profile Call back
function loadProfileCallback(profile) {
	
    var userData = {};
    //userData.securitykey = 'googleplus123';
    //userData.oauthid = profile.id;
    //userData.oauthsiteid = 'googleplus';
    email = profile.emails[0].value;
    firstname = profile.name.givenName;
    lastname = profile.name.familyName;
    gender = profile.gender;
    image_url = profile.image.url;
    //userData.hometown = '';
    //userData.location = '';
	loginObj.googlelogin(firstname,lastname,email,gender,image_url);
}

var loginObj={
		init:function(){
		},
		registersimple:function(){
		ths=this;
		var firstname=$('#fname').val();
		var lastname=$('#lname').val();
		var email=$('#email').val();
		var password=$('#password').val();
		var reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		var status=true;
		if($.trim(firstname)=='')
		{
		$('#fname').css('border-color','red');
		status=false;
		return false;
		}
		else{
		$('#fname').css('border-color','');
		status=true;
		}
		if($.trim(lastname)=='')
		{
		$('#lname').css('border-color','red');
		status=false;
				return false;

		}
		else{
		$('#lname').css('border-color','');
		status=true;
		}
		if($.trim(email)=='')
		{
		$('#email').css('border-color','red');
		status=false;
				return false;

		}
		else{
		$('#email').css('border-color','');
		status=true;
		}
		if(reg.test(email)==false)
		{
		$('#email').css('border-color','red');
		status=false;
				return false;

		}
		else{
		$('#email').css('border-color','');
		status=true;
		}
		
		if($.trim(password)=='' || password.length<8)
		{
		alert('Password Min Lenght 8 Character');
		$('#password').css('border-color','red');
		status=false;
		}
		else{
		$('#password').css('border-color','');
		status=true;
		}
		if(status)
		{
		ths.showLoader();
		$.post( CONSTANT.SITE_URL+'/register', { firstname:firstname,lastname:lastname,email:email,password:password,type:'simple'})
		.done(function( data ) {
			ths.hideLoader();
			var data=$.parseJSON( data);
			if(data.status)
			{
			$('#regmessage').text(data.message);
			$('#regmessage').css('color','green');
			//window.location.reload();
			}else{
			$('#regmessage').text(data.message);
			$('#regmessage').css('color','red');
			}
		});
			
		}
		return false;
		
		},
		apploynow:function(){
				var ths=this;
				var firstname=$('#fcname').val();
				var lastname=$('#lcname').val();
				var email=$('#emailc').val();
				var phone=$('#phone').val();
				var position=$('#position').val();
				var time=$('#time').val();
				var lang=$('#language').val();
				var portfolio=$('#portfolio').val();
				var start=$('#start').val();
				var reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
				var status=true;
				if($.trim(firstname)=='')
				{
				$('#fcname').css('border-color','red');
				$('#fcname').addClass('invalid');
				}
				else{
				$('#fcname').css('border-color','');
				$('#fcname').removeClass('invalid');
				}
				if($.trim(lastname)=='')
				{
				$('#lcname').css('border-color','red');
				$('#lcname').addClass('invalid');
				}
				else{
				$('#lcname').css('border-color','');
				$('#lcname').removeClass('invalid');
				}
				if(reg.test(email)==false)
				{
				$('#emailc').css('border-color','red');
				$('#emailc').addClass('invalid');
				}
				else{
				$('#emailc').css('border-color','');
				$('#emailc').removeClass('invalid');
				}
				if(reg.test(email)==false)
				{
				$('#emailc').css('border-color','red');
				$('#emailc').addClass('invalid');
				}
				else{
				$('#emailc').css('border-color','');
				$('#emailc').removeClass('invalid');
				}
				if($.trim(phone)=='')
				{
				$('#phone').css('border-color','red');
				$('#phone').addClass('invalid');
				}
				else{
				$('#phone').css('border-color','');
				$('#phone').removeClass('invalid');
				}
				if($.trim(position)=='')
				{
				$('#position').css('border-color','red');
				$('#position').addClass('invalid');
				}
				else{
				$('#position').css('border-color','');
				$('#position').removeClass('invalid');
				}
				if($.trim(time)=='')
				{
				$('#time').css('border-color','red');
				$('#time').addClass('invalid');
				}
				else{
				$('#time').css('border-color','');
				$('#time').removeClass('invalid');
				}
			var status=false;
			$('.inputbox').each(function(ev){
			if($(this).hasClass('invalid'))
			{
			status=2
			return false;
			}
			else
			{
			status=1;
			}
			});
			if(status==1)
			{
			ths.showLoader();
			$.post( CONSTANT.SITE_URL+'/careers/applynow', { firstname:firstname,lastname:lastname,email:email,phone:phone,time:time,position:position,lang:lang,portfolio:portfolio,start:start})
							.done(function( data ) {
								ths.hideLoader();
								if(data)
								{
						    $('#job').find("input[type=text], select").val("");
							$('#career-modal').hide();
								alert('Application sent successfully');
								
								}else{
								alert('some Problem in System');
								}
				});
			}
			else
			{
			alert('Please fill the from');
			}
		},
		startLogin:function(){
		var loginusername=$('#loginusername').val();
		var password=$('#loginpass').val();
		var reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		var status=true;
		if(reg.test(loginusername)==false)
		{
		$('#loginusername').css('border-color','red');
		status=false;
		return false;
		}
		else{
		$('#loginusername').css('border-color','');
		status=true;
		}
		if($.trim(password)=='')
		{
		$('#loginpass').css('border-color','red');
		status=false;
		return false;
		}
		else{
		$('#loginpass').css('border-color','');
		status=true;
		}
		if(password  && loginusername)
		{
		this.loginProcess(loginusername,password);
		}
		},
		generateToken:function(){
		var ths=this
		ths.showLoader();
		$.post( CONSTANT.SITE_URL+'/apitoken', {})
		.done(function( data ) {
			if(data!=0)
			{
			$('#showtoken').empty();
			$('#showtoken').text(data);
			}
			else{
			$('#loginmessage').text("Problem in Token Generation try again");
			}
			ths.hideLoader();
		});
		
		},
		showLoader:function(){
		$('div.overlaydive').show();
		},
		hideLoader:function(){
		$('div.overlaydive').hide();
		},
		googleloginstart:function(){
           gapi.auth.signIn(google_options);
		},
		loginProcess:function(loginusername,password){
		var ths=this;
		ths.showLoader();
		$.post( CONSTANT.SITE_URL+'/login', { username:loginusername,password:password})
		.done(function( data ) {
			if(data!=0)
			{
			window.location.reload();
			}
			else{
			$('#loginmessage').text("Email Or Password Wrong !");
			$('#loginmessage').css('color','red');
			}
			ths.hideLoader();
		});
		},
		forgetpassword:function(){
		var forgetemail=$('#forgetemail').val();
		var reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		var status=true;
		if(reg.test(forgetemail)==false)
		{
		$('#forgetemail').css('border-color','red');
		status=false;
		return false;
		}
		else{
		$('#forgetemail').css('border-color','');
		status=true;
		}
		var ths=this;
		if(status){
		ths.showLoader();
		$.post( CONSTANT.SITE_URL+'/forgetpassword', { forgetemail:forgetemail})
		.done(function( data ) {
			if(data!=0)
			{
			$('#forgetmessage').text("password sent successfully please check in "+forgetemail);
			$('#forgetmessage').css('color','green');
			}
			else{
			$('#forgetmessage').text("Email Not Exist !");
			$('#forgetmessage').css('color','red');
			}
			ths.hideLoader();
		});
		}
		},
		facebookLoginCall:function(response){
				if(response.authResponse) {
						$('div.overlaydive').show();
						var access_token =   FB.getAuthResponse()['accessToken'];
						FB.api('/me', function(response) {
						var firstname=response.first_name;
						var lastname=response.last_name;
						var gender=response.gender;
						var image_url='https://graph.facebook.com/'+response.id+'/picture';
						var email=response.email;
						$.post( CONSTANT.SITE_URL+'/loginfb', { firstname:firstname,lastname:lastname,email:email,gender:gender,image_url:image_url,type:'fb'})
							.done(function( data ) {
								//ths.hideLoader();
								if(data)
								{
								window.location.reload();
								}else{
								alert('some Problem in System');
								}
							});
						$('div.overlaydive').hide();
						});
		}
		else {
		alert("Problem in Facebook Login");
		return false;
		}
		},
		linkedinlogin:function(firstname,lastname,email,image_url,gender){
						$('div.overlaydive').show();
						$.post( CONSTANT.SITE_URL+'/loginfb', { firstname:firstname,lastname:lastname,email:email,image_url:image_url,gender:gender,type:'linkedin'})
							.done(function( data ) {
								//ths.hideLoader();
								if(data)
								{
								window.location.reload();
								}else{
								alert('some Problem in System');
								}
							$('div.overlaydive').hide();
							});
						
			},
			googlelogin:function(firstname,lastname,email,gender,image_url){
						$('div.overlaydive').show();
						$.post( CONSTANT.SITE_URL+'/loginfb', { firstname:firstname,lastname:lastname,email:email,gender:gender,image_url:image_url,type:'google'})
							.done(function( data ) {
								//ths.hideLoader();
								if(data)
								{
								window.location.reload();
								}else{
								alert('some Problem in System');
								}
							$('div.overlaydive').hide();
							});
						
			},
}


	$(document).ready(function(){
	$('#apitoken').click(function(){
			loginObj.generateToken();
	});
	$('#register').click(function(){
	$('#loginwraper').fadeOut(function(){
		$('#registerwraper').fadeIn();
	});
	});
	$('#forgetbutton').click(function(){
		loginObj.forgetpassword();
	});
	$('#login').click(function(){
	$('#registerwraper').fadeOut(function(){
		$('#loginwraper').fadeIn();
	});
	});
	$('#forgetpassword').click(function(){
	$('#loginwraper').fadeOut(function(){
		$('#forgotwraper').fadeIn();
	});
	});
	$('#cancel').click(function(){
	$('#forgotwraper').fadeOut(function(){
		$('#loginwraper').fadeIn();
	});
	});
	$('#registernow').click(function(){
	loginObj.registersimple();
	});
	$('#startlogin').click(function(){
	loginObj.startLogin();
	});
	$('a.linkedin').click(function(){
	loginObj.linkedinlogin();
	});
	$('a.google').click(function(){
	loginObj.googleloginstart();
	});
	$('#applynow').click(function (){
	loginObj.apploynow();
	});
  $('a.facebook').click(function(){
			FB.login(loginObj.facebookLoginCall,{scope: 'email'});
  });
  $("#phone").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
  $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
			$('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })
  window.fbAsyncInit = function() {
  FB.init({
    appId      : CONSTANT.FB_ID, // App ID
    channelUrl : CONSTANT.CHANNEL_URL, // Channel File
    cookie     : true,  // enable cookies to allow the server to access 
                       // the session
	status     : false,
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  };
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
	});
