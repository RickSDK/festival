//-------------facebook functions
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '3399067146824355',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v8.0'           // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };
 
  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name, response);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        dismisPopup('fbLoginPopup');
        dismisPopup('clickHereDiv2');
        showPopup('clickHereDiv1');
        localStorage.facebookName = response.name;
        localStorage.facebookId = response.id;
        
    });
  }

  function dismisPopup(id) {
      var e = document.getElementById(id);
      if(e)
        e.style.display = 'none';
  }
  function showPopup(id) {
    var e = document.getElementById(id);
    if(e)
      e.style.display = 'block';
}
//--------------facebook functions
function getTextValue(id) {
    return document.getElementById(id).value;
}
function pad(n, width, z) {
    width = width || 2;
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function closePopup(id) {
    var e = document.getElementById(id);
    if (e) {
        e.style.display = 'none';
    }
}
function displayPopup(id, errorFlg) {
    var e = document.getElementById(id);
    if (e) {
        e.style.display = 'block';
    } else
        console.log('!!not found!!', id);
    if (errorFlg) {
        var errorSound = new Audio('assets/sounds/error.mp3');
        errorSound.play();
    }
}

// csv file----------------------------
function generateCsvFile(filename, page) {
    var a = document.createElement('a');
    a.textContent = 'download';
    a.download = filename + ".csv";
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(page);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function generateXlsxFile(filename, data) {
    var a = document.createElement('a');
    a.textContent = 'download';
    a.download = filename + ".xlsx";
    a.href = 'data:application/xlsx;base64,' + data;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function generatePdfFile(filename, data) {
    var a = document.createElement('a');
    a.textContent = 'download';
    a.download = filename + ".pdf";
    a.href = 'data:application/pdf;base64,' + data;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
// currency------
function currencyObj(amount) {
    return { amount: amount, currency: formatNumberToLocalCurrency(amount) }
}
function formatNumberToLocalCurrency(amount = 0, refresh = false) {
    if (refresh || !localStorage.geoplugin_currencyCode) {
        $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function (data) {
            localStorage.geoplugin_currencyCode = data.geoplugin_currencyCode;
        });
    }

    const formatter = new Intl.NumberFormat(navigator.language || 'en-US', {
        style: 'currency',
        currency: localStorage.geoplugin_currencyCode || 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(amount);
}