/*
 Name: Axel Solano
 Course: MIS 3371
 File name: extracredit.js
 Date created: 12/08/25
 Date updated: 12/10/25
 Description: 
    - Modified implementation of google maps autocomplete API documentation code (lines 16-95)
    - Logic for color shifting in symptom severity slider (lines 100-119)
    - Logic for password visibility button (lines 134-137)
    - Submit button modal box logic (lines 517-615)
 */

//Start map api logic

let autocomplete;
async function initAutocomplete() {
    // Import the necessary library
    const { Autocomplete } = await google.maps.importLibrary("places");

    // Get the input element for the address
    const address1Field = document.getElementById("ad1");
    
    // Set up the Autocomplete widget options
    const options = {
        // Restrict predictions to addresses (streets, house numbers)
        componentRestrictions: { country: "us" }, 
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
    };

    // Create the Autocomplete instance and link it to the 'ad1' input field
    autocomplete = new Autocomplete(address1Field, options);

    // Add a listener to wait for the user to select an address from the dropdown
    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object
    const place = autocomplete.getPlace();

    // Define the component types we want to extract
    const componentForm = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name", // City
        administrative_area_level_1: "short_name", // State
        postal_code: "short_name", // Zip Code
    };

    // Clear out the previous values in the form fields
    document.getElementById("ad1").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zip").value = "";
    
    // Get references to your HTML elements
    const ad1Field = document.getElementById("ad1");
    const cityField = document.getElementById("city");
    const stateField = document.getElementById("state");
    const zipField = document.getElementById("zip");

    // Fill in the address components from the Google Maps place object
    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (componentForm[addressType]) {
            const val = component[componentForm[addressType]];
            
            switch (addressType) {
                case "street_number":
                    // Combine street number and route for ad1
                    ad1Field.value = val + (ad1Field.value ? " " + ad1Field.value : "");
                    break;
                case "route":
                    ad1Field.value += " " + val;
                    break;
                case "locality":
                    cityField.value = val;
                    break;
                case "administrative_area_level_1":
                    stateField.value = val;
                    break;
                case "postal_code":
                    zipField.value = val;
                    break;
            }
        }
    }
}

// Initialize the autocomplete feature when the script loads
initAutocomplete();

//End map api logic

//Start slider appearance logic
function updateSliderAppearance(value) {
    const slider = document.getElementById('severity');
    const display = document.getElementById('rangedisplay');
    
    display.textContent = `Current Value: ${value}`;

    let color;
    if (value >= 1 && value <= 3) {
        color = 'green';
    } else if (value >= 4 && value <= 6) {
        color = 'orange';
    } else if (value >= 7 && value <= 10) {
        color = 'red';
    } else {
        
        color = '#ddd'; 
    }

    slider.style.setProperty('--slider-color', color);
}
//End slider appearance logic

//Start password visibility logic
function setupPasswordToggle(inputId, toggleButtonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(toggleButtonId);

    if (passwordInput && toggleButton) {
        toggleButton.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('active');
        });
    }
}
setupPasswordToggle('pword', 'togglePassword');
setupPasswordToggle('cpword', 'toggleConfirmPassword');
//End password visbility logic

let error_flag = 0;

function fNameValidation() {
    x = document.getElementById("fname").value;
    if( x.length<2) { 
      document.getElementById("fname_message").innerHTML = "Invalid first name... too short.";  
      error_flag = 1;
      }
        else {
            if (x.match(/[a-zA-Z3-5'-]+$/)) {
              document.getElementById("fname_message").innerHTML = "";  
            }
            else  {
              document.getElementById("fname_message").innerHTML = "Invalid characters in first name.";
              error_flag = 1;
              }
        }
    }

function lNameValidation() {
        x = document.getElementById("lname").value;
        if( x.length<2) { 
              document.getElementById("lname_message").innerHTML = "Invalid last name... too short.";
              error_flag = 1;  
        }
        else {
            if (x.match(/[a-zA-Z3-5'-]+$/)) {
              document.getElementById("lname_message").innerHTML = "";  
            }
            else  {
              document.getElementById("lname_message").innerHTML = "Invalid characters in last name.";
              error_flag = 1;
              }
        }
    }

function miValidation() {
  x = document.getElementById("mi").value;
    if( x.length>0) { 
        if (x.match(/[a-zA-Z ]/)) {
          document.getElementById("mi_message").innerHTML = "";  
          }
          else {
            document.getElementById("mi_message").innerHTML = "Invalid middle initial.";
            error_flag = 1;
            }
        }
    }

function uIdValidator() {
  var x = document.getElementById("uID").value;
  var message = "";

    if (x.length === 0) {
      message = "User ID is required.";
      error_flag = 1;
     }

  else if (/^[0-9]/.test(x)) {
    message = "User ID cannot start with a number.";
    error_flag = 1;
  }
  
  else if (x.length < 5 || x.length > 20) {
    message = "User ID must be between 5 and 20 characters.";
    error_flag = 1;
  }
  
  else if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(x)) {
    message = "Only letters, numbers, dash, and underscore allowed.";
    error_flag = 1;
  }
  
  else {
    message = "";
  }
  document.getElementById("uID_message1").innerHTML = message; 
  }

function emailValidator() {
  var x = document.getElementById("email").value;
  var message = "";

  if (x.length === 0) {
    message = "Email is required.";
    error_flag = 1;
  }
  
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,20}$/.test(x)) {
    message = "Invalid email format. Use name@domain.tld";
    error_flag = 1;
  }

  else {
    message = "";
  }

  document.getElementById("email_message1").innerHTML = message;
}

function pwordValidator() {
  var passwordoutput;
  var passwordinput = document.getElementById("pword").value;
  var userid = document.getElementById("uID").value;
  console.log(passwordinput);
    
    if(passwordinput.search(/[a-z]/) < 0 ) {
      passwordoutput = "Enter at least 1 lower case letter.";
      error_flag = 1;
    } else {
      passwordoutput = "";
    }
    document.getElementById("password_message1").innerHTML = passwordoutput;
    
    if(passwordinput.search(/[A-Z]/)< 0)  {  
      passwordoutput = "Enter at least 1 upper case letter.";
      error_flag = 1;
    } else {
      passwordoutput = "";
    }
    document.getElementById("password_message2").innerHTML = passwordoutput;
  
   if(passwordinput.search(/[0-9]/)<0 ) {   
    passwordoutput = "Enter at least 1 number.";
    error_flag = 1;
    } else {
    passwordoutput = "";
    }
    document.getElementById("password_message3").innerHTML = passwordoutput;
    
   if(passwordinput.search(/[!\@#\$%&*\-_\\.+\(\)]/)<0 ) {   
    passwordoutput = "Enter at least 1 special character.";
    error_flag = 1;
    } else {
    passwordoutput = "";
    }
    document.getElementById("password_message4").innerHTML = passwordoutput;
  
  if(passwordinput.length < 8) {
      passwordoutput = "Enter a Minimum 8 characters.";
      error_flag = 1;
  } else {
      passwordoutput = "";
  }
    document.getElementById("password_message5").innerHTML = passwordoutput;

  if (passwordinput.toLowerCase() === userid.toLowerCase() && userid !== "") {
    passwordoutput = "Password cannot be the same as your User ID.";
    error_flag = 1;
    } else {
      passwordoutput = "";
    }
    document.getElementById("password_message6").innerHTML = passwordoutput;
  }

function cpwordValidator() {
  x=document.getElementById("pword").value;
  y=document.getElementById("cpword").value;
    if ( x===y ) 
    {
      document.getElementById("cpword_msg").innerHTML = "";
    } else  
      {
         document.getElementById("cpword_msg").innerHTML = "Passwords DO NOT match!";
         error_flag = 1;
      }
    }

function genderValidator() {
  const genderOptions = document.getElementsByName("sex");
  const genderMessage = document.getElementById("gender_msg");
  let selected = false;

  for (let i = 0; i < genderOptions.length; i++) {
    if (genderOptions[i].checked) {
      selected = true;
      break;
     }
    }
  
  if (!selected) {
        genderMessage.innerHTML = "Please select a gender option.";
        error_flag = 1;
    } else {
        genderMessage.innerHTML = "";
    }
}

function bDayValidation() {
  const birthdateInput = document.getElementById("bday");
  var bdayValue = birthdateInput.value;
  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];
  
  const minDateLimit = new Date();
  minDateLimit.setFullYear(today.getFullYear() - 120);
  const minDate = minDateLimit.toISOString().split('T')[0];

  birthdateInput.setAttribute('max', maxDate);
  birthdateInput.setAttribute('min', minDate);

  const messageElement = document.getElementById("bday_message");
  var message = "";

  if (bdayValue.length === 0) {
    message = "Birthday is required.";
    error_flag = 1;
  } 
  else {
    var enteredDate = new Date(bdayValue);

    if (enteredDate > today) {
      message = "Birthday cannot be in the future.";
      error_flag = 1;
    } 
    else if (enteredDate < minDateLimit) {
      message = "Birthday cannot be more than 120 years ago.";
      error_flag = 1;
    } 
    else {
      message = "";
    }
  }

  messageElement.innerHTML = message;
}

function ssnValidation() {
  const ssnInput = document.getElementById("ssn");
  const message = document.getElementById("ssn_message");
  let digits = ssnInput.value.replace(/\D/g, "");

    if (digits.length > 3 && digits.length <= 5) {
    ssnInput.value = digits.slice(0, 3) + "-" + digits.slice(3);
  } else if (digits.length > 5) {
    ssnInput.value = digits.slice(0, 3) + "-" + digits.slice(3, 5) + "-" + digits.slice(5, 9);
  } else {
    ssnInput.value = digits;
  }

  if (digits.length === 0) {
    message.textContent = "";
  } else if (!/^\d+$/.test(digits)) {
    message.textContent = "SSN must contain only numbers.";
    error_flag = 1;
  } else if (digits.length !== 9) {
    message.textContent = "SSN must be exactly 9 digits.";
    error_flag = 1;
  } else {
    message.textContent = "";
  }

  return !error_flag;
}

function ad1Validation() {
x = document.getElementById("ad1").value;
console.log(x.value);
console.log(x.length);
  if (x.length < 2 ) {  
      document.getElementById("ad1_message").innerHTML = "Address line 1 must be at least 2 characters.";  
      error_flag = 1; 
      console.log(error_flag);
      }
      else { 
          document.getElementById("ad1_message").innerHTML = "";  
      }
      console.log(document.getElementById("ad1_message").innerHTML);
}

function ad2Validation() {
x = document.getElementById("ad2").value;
  if (x.length === 0) {
    document.getElementById("ad2_message").innerHTML = "";
  } 
  else if (x.length < 2) {
    document.getElementById("ad2_message").innerHTML = "Address line 2 must be at least 2 characters if entered.";
    error_flag = 1;
  } 
  else {
    document.getElementById("ad2_message").innerHTML = "";
  }
}

function cityValidator() {
  var x = document.getElementById("city").value;

  if (x.length < 2) {
    document.getElementById("city_msg").innerHTML = "City name must be at least 2 characters.";
    error_flag = 1;
  } 
  else if (!x.match(/^[ a-zA-Z3-5'-]+$/)) {
    document.getElementById("city_msg").innerHTML = "Invalid characters in City name.";
    error_flag = 1;
  } 
  else {
    document.getElementById("city_msg").innerHTML = "";
  }
}

function stateValidator() {
  x=document.getElementById("state").value;
        if(x==="") { 
              document.getElementById("state_msg").innerHTML = "Please choose a state.";  
              error_flag = 1;
        }
        else {
          document.getElementById("state_msg").innerHTML = ""; 
        }
}

function zipValidator() {
  var zip = document.getElementById("zip").value;
  var message = "";

  if (zip.length === 0) {
    message = "Zip Code is required.";
    error_flag = 1;
  } 
  else if (!/^\d{5}$/.test(zip)) {
    message = "Zip Code must be exactly 5 digits.";
    error_flag = 1;
  } 
  else {
    message = "";
  }
  document.getElementById("zip_msg").innerHTML = message;
}

function phoneValidator() {
  var phoneInput = document.getElementById("phone");
  var messageElement = document.getElementById("phone_message");
  var x = phoneInput.value.replace(/\D/g, "");
  var message = "";

  if (x.length > 0) {
    if (x.length <= 3) {
      phoneInput.value = "(" + x;
    } else if (x.length <= 6) {
      phoneInput.value = "(" + x.substring(0, 3) + ") " + x.substring(3);
    } else if (x.length <= 10) {
      phoneInput.value = "(" + x.substring(0, 3) + ") " + x.substring(3, 6) + "-" + x.substring(6);
    } else {
      phoneInput.value = "(" + x.substring(0, 3) + ") " + x.substring(3, 6) + "-" + x.substring(6, 10);
    }
  }

  if (x.length < 10) {
    message = "Please enter a valid phone number.";
    error_flag = 1;
  } else {
    message = "";
  }
  messageElement.innerHTML = message;
}

function selectInscValidator() {
  const insuranceOptions = document.getElementsByName("haveInsurance");
  const insuranceMessage = document.getElementById("insurance_msg");
  let selected = false;

  for (let i = 0; i < insuranceOptions.length; i++) {
    if (insuranceOptions[i].checked) {
      selected = true;
      break;
     }
    }
  
  if (!selected) {
        insuranceMessage.innerHTML = "Please choose if you have insurance or not.";
        error_flag = 1;
    } else {
        insuranceMessage.innerHTML = "";
    }
}

//Submit Modal Box Functions:
function returnInput() {
  var formcontents = document.getElementById("mainForm");
  var formoutput;
  var datatype;
  var i;
  formoutput = "<table class='output'><th>Dataname</th><th>Type</th><th>Value</th>";
    for (i = 0; i < formcontents.length; i++) {
      console.log("item: "+i+" "+formcontents.elements[i].name+" = "+formcontents.elements[i].value);
        {
          datatype = formcontents.elements[i].type;
          switch (datatype) {
            case "checkbox":
              if (formcontents.elements[i].checked) {
                formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                formoutput = formoutput +"<td class='outputdata'>Checked</td></tr>";
                }
              break;
              case "radio":
                if (formcontents.elements[i].checked) {
                  formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                  formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                  formoutput = formoutput +"<td class='outputdata'>"+ formcontents.elements[i].value+"</td></tr>";
                  }
              break;
              case "button": case "submit": case "reset":
              break;
              default:
              let value = formcontents.elements[i].value;
              if (formcontents.elements[i].name === "uID") {
                value = value.toLowerCase();
                formcontents.elements[i].value = value;
                }
                formoutput = formoutput + "<tr><td align='right'>"+formcontents.elements[i].name+"</td>";
                formoutput = formoutput +"<td align='right'>"+ datatype + "</td>";
                formoutput = formoutput +"<td class='outputdata'>"+ formcontents.elements[i].value+"</td></tr>";
                }
    }
      }

       if (formoutput.length>0) { 
         formoutput = formoutput + "</table>";
         document.getElementById("inputValues").innerHTML = formoutput;
         }
    }

function openModal() {
 var modal = document.getElementById("reviewModal");
  if (modal) {
        modal.style.display = "block";
    }
}

function closeModal() {
    var modal = document.getElementById("reviewModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function submitForm() {
    document.getElementById("mainForm").submit(); 
}

function mainFormValidator() {
  error_flag = 0;
  const emailField = document.getElementById("email");
  emailField.value = emailField.value.toLowerCase();
  fNameValidation();
  lNameValidation();
  miValidation();
  uIdValidator();
  emailValidator();
  pwordValidator();
  cpwordValidator();
  genderValidator();
  bDayValidation();
  ssnValidation();
  ad1Validation();
  ad2Validation();
  cityValidator();
  stateValidator();
  zipValidator();
  phoneValidator();
  selectInscValidator();

  const errorMsgs = document.querySelectorAll("td[id$='_message'], td[id$='_msg']");
    errorMsgs.forEach(msg => {
        if (msg.textContent.trim() !== "") {
            error_flag = 1;
        }
    });
  if (error_flag === 0) {
      returnInput();
      openModal();
  } else {
      alert("Some fields contain errors. Please correct them before reviewing.");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const slider = document.getElementById("severity");
  const output = document.getElementById("rangedisplay");

  if (slider && output) {
    output.textContent = slider.value;
    slider.addEventListener("input", function() {
      output.textContent = this.value;
    });
  }
});

// Use of Fetch API...
document.addEventListener("DOMContentLoaded", () => {
  fetch("states.xml")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load states.xml");
      }
      return response.text();
    })
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const states = xmlDoc.getElementsByTagName("state");
      const stateSelect = document.getElementById("state");

      for (let i = 0; i < states.length; i++) {
        const code = states[i].getAttribute("code");
        const name = states[i].textContent;
        const option = document.createElement("option");
        option.value = code;
        option.textContent = name;
        stateSelect.appendChild(option);
      }
    })
    .catch(error => console.error("Error loading states:", error));
});

// Start Cookie creation...
function setCookie(name, value) {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + 48 * 60 * 60 * 1000); // 48 hrs
    document.cookie = `${name}=${value}; expires=${expiration.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, val] = c.split("=");
        if (key === name) return val;
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Start Local Storage creation...

    // IDs that MUST NEVER be saved:
const sensitiveFields = ["pword", "cpword", "ssn"];

function saveFieldToLocalStorage(id) {
    if (sensitiveFields.includes(id)) return;
    const field = document.getElementById(id);
    if (!field) return;

    let value = field.value;

    // If checkbox, save checked state
    if (field.type === "checkbox") {
        value = field.checked ? "true" : "false";
    }

    // If radio, save only checked ones
    if (field.type === "radio" && field.checked) {
        localStorage.setItem(id, value);
        return;
    }

    localStorage.setItem(id, value);
}

function loadLocalStorageIntoForm() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (sensitiveFields.includes(key)) continue;

        const field = document.getElementById(key);
        if (!field) continue;

        let stored = localStorage.getItem(key);

        if (field.type === "checkbox") {
            field.checked = stored === "true";
        } else if (field.type === "radio") {
            if (field.value === stored) field.checked = true;
        } else {
            field.value = stored;
        }
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

// Start Event Listener for autosave...

document.querySelectorAll("input, textarea, select").forEach(field => {
    field.addEventListener("blur", () => {
        saveFieldToLocalStorage(field.id);
    });
});

// Start 'Remember Me' checkbox logic...

document.getElementById("rememberMe").addEventListener("change", function () {
    if (!this.checked) {
        clearLocalStorage();
        deleteCookie("fname");
        localStorage.setItem("rememberMeChecked", "false");
    } else {
        localStorage.setItem("rememberMeChecked", "true");

        // If checked and fname exists, save cookie
        const fnameValue = document.getElementById("fname").value;
        if (fnameValue.length > 0) setCookie("fname", fnameValue);
    }
});

// Will save cookie when name changes...

document.getElementById("fname").addEventListener("blur", function () {
    if (document.getElementById("rememberMe").checked) {
        setCookie("fname", this.value);
    }
});

// Start Onload functions + popup handler...

window.onload = function() {

    // Insert today's date at top
    const dateElement = document.getElementById("today");
    if (dateElement) {
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    const savedName = getCookie("fname");
    const rememberMe = localStorage.getItem("rememberMeChecked");

    if (savedName && rememberMe === "true") {

        // Custom popup:
        let popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.padding = "20px";
        popup.style.background = "white";
        popup.style.boxShadow = "0px 0px 10px black";
        popup.innerHTML = `
            <h2>Welcome back, ${savedName}!</h2>
            <button id="continueUser">Continue</button>
            <button id="newUser">This isn't me</button>
        `;
        document.body.appendChild(popup);

        // Continue button
        document.getElementById("continueUser").onclick = function() {
            loadLocalStorageIntoForm();
            popup.remove();
        };

        // New User button
        document.getElementById("newUser").onclick = function() {
            deleteCookie("fname");
            clearLocalStorage();
            document.querySelector("form").reset();
            popup.remove();
            document.getElementById("user").textContent = "New User";
        };
    }  
};

    // Will load in cookie in Welcome message in header
document.addEventListener("DOMContentLoaded", function () {
    const userSpan = document.getElementById("user");
    const storedName = readCookie("fname");

    if (storedName && storedName.trim() !== "") {
        userSpan.textContent = storedName;
    } else {
        userSpan.textContent = "New User";
    }
});