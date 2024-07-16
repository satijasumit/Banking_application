function validate(){
    var fullname=document.getElementById("fname").value;
    var middlename=document.getElementById("mname").value;
    var lastname=document.getElementById("lname").value;
    var gender=document.getElementById("gender").value;
    var phone=document.getElementById("phonenumber").value;
    var dob=document.getElementById("DOB").value;
    var email=document.getElementById("email").value;

    if(fullname.value=="" || lastname.value=="" || gender.value=="" || phone.value=="" || dob.value=="" || email.value=="")
                {
                    alert("No blank values required!");
                    return false;
                }
            else{
                true;
            }

}




// function validate(){
//     var fullname=document.getElementById("fname");
//     var middlename=document.getElementById("mname");
//     var lastname=document.getElementById("lname");
//     var gender=document.getElementById("gender");
//     var phone=document.getElementById("phonenumber");
//     var dob=document.getElementById("DOB");
//     var email=document.getElementById("email");

//     if(fullname.value==="" || lastname.value==="" || gender.value==="" || phone.value==="" || dob.value==="" || email.value==="")
//         {
//             alert("No blank values required!");
//             return false;
//         }
//     else{
//         true;
//     }
// }




// // function seterror(id,error){

// // }

// // function validateForm() {
// //     //const form = document.forms["Personal Details form"];
// //     var name=document.forms['PersonalDetailsform']["fname"].value;
// //     console.log(name);
// //     return false;
// //     // const firstName = form-one["fname"].getElementsByTagName("input")[0].value.trim();
// //     // const lastName = form-one["lname"].getElementsByTagName("input")[0].value.trim();
// //     // const gender = form-one["gender"].getElementsByTagName("select")[0].value;
// //     // const phoneNumber = form-one["phonenumber"].getElementsByTagName("input")[0].value.trim();
// //     // //const dob = form["DOB"].getElementsByTagName("input")[0].value.trim();
// //     // const email = form["email"].getElementsByTagName("input")[0].value.trim();
// //     // const dob = document.getElementById('DOB').value;

// //     // if (dob) {
// //     //     const [year, month, day] = dob.split('-');
// //     //     const formattedDob = `${day}-${month}-${year}`;
// //     //     form["DOB"].getElementsByTagName("input")[0].value.trim() = formattedDob;

// //     //     // Validate age
// //     //     const today = new Date();
// //     //     const birthDate = new Date(year, month - 1, day);
// //     //     const age = today.getFullYear() - birthDate.getFullYear();
// //     //     const monthDiff = today.getMonth() - birthDate.getMonth();
// //     //     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
// //     //         age--;
// //     //     }
// //     //     if (age < 18) {
// //     //         alert("Age should be at least 18 years.");
// //     //         return false;
// //     //     }
// //     // }

// //     // // Required field validation
// //     // if (!firstName) {
// //     //     alert("First Name is required");
// //     //     return false;
// //     // }

// //     // if (!lastName) {
// //     //     alert("Last Name is required");
// //     //     return false;
// //     // }

// //     // if (!gender) {
// //     //     alert("Gender is required");
// //     //     return false;
// //     // }

// //     // if (!phoneNumber) {
// //     //     alert("Phone Number is required");
// //     //     return false;
// //     // }

// //     // if (!dob) {
// //     //     alert("Date of Birth is required");
// //     //     return false;
// //     // }

// //     // if (!email) {
// //     //     alert("Email is required");
// //     //     return false;
// //     // }

// //     // // Phone number validation
// //     // const phonePattern = /^\d{10}$/;
// //     // if (!phonePattern.test(phoneNumber)) {
// //     //     alert("Phone Number must be 10 digits only");
// //     //     return false;
// //     // }

// //     // // DOB validation
// //     // const today = new Date();
// //     // const dobDate = new Date(dob);
// //     // const age = today.getFullYear() - dobDate.getFullYear();
// //     // const monthDifference = today.getMonth() - dobDate.getMonth();
// //     // if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
// //     //     age--;
// //     // }

// //     // if (dobDate > today) {
// //     //     alert("Date of Birth cannot be in the future");
// //     //     return false;
// //     // }

// //     // if (age < 18) {
// //     //     alert("Age must be at least 18 years");
// //     //     return false;
// //     // }

// //     // return true;
// // }
