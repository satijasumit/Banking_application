{/* <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script type="text/javascript"> */}
    const form=document.getElementById('form');
    const firstname=document.getElementById('FirstName');
    const middlename=document.getElementById('MiddleName');
    const lastname=document.getElementById('LastName')
    const email=document.getElementById('Email')
    const phonenumber=document.getElementById('Phone');
    const dob=document.getElementById('DOB');
    const nextBtns = document.getElementById("submit");
    const prevBtns = document.getElementById("btn-prev");
    const progress = document.getElementById("progress");
    const formSteps = document.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".progress-step");

    let formStepsNum = 0;

    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        validate();
    })

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          formStepsNum++;
          updateFormSteps();
          updateProgressbar();
        });
      });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          formStepsNum--;
          updateFormSteps();
          updateProgressbar();
        });
      });


      function updateFormSteps() {
        formSteps.forEach((formStep) => {
          formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
        });
      
        formSteps[formStepsNum].classList.add("form-step-active");
      }

      function updateProgressbar() {
        progressSteps.forEach((progressStep, idx) => {
          if (idx < formStepsNum + 1) {
            progressStep.classList.add("progress-step-active");
          } else {
            progressStep.classList.remove("progress-step-active");
          }
        });
        const progressActive = document.querySelectorAll(".progress-step-active");

        progress.style.width =
          ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
      }

    const sendData=(usernameVal,sRate,count)=>{
        if(sRate===count){
            alert('Personal Details Registered Succesfully!');
            swal("Welcome!"+usernameVal,"Registration Succesful!","success");
        }
    }
    
    const successMsg=(usernameVal)=>{
        let formCon=document.getElementsByClassName('form-control');
        var count=formCon.length -1;
        for(var i=0;i< formCon.length;i++){
            if(formCon[i].className==="form-control success"){
                var sRate= 0 + i;
                console.log(sRate);
                sendData(usernameVal,sRate,count);
            }
            else{
                return false;
            }
        }
    }
    //defining the validate function
    const validate=() =>{
    const firstnameVal=firstname.value.trim();
    const middlenameVal=middlename.value.trim();
    const lastnameVal=lastname.value.trim();
    const emailVal=email.value.trim();
    const phonenumberVal=phonenumber.value.trim();
    const dobVal=dob.value.trim();
    
    const isEmail=(emailVal)=>{
        var atSymbol=emailVal.indexOf("@");
        if(atSymbol<1) return false;
        var dot= emailVal.lastIndexOf('.');
        if(dot<= atSymbol + 2) return false;
        if(dot=== emailVal.length -1) return false;
        return true;
    };
    
    const isValidDob = (dobVal) => {
        const dobDate = new Date(dobVal);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    };

    // validate firstname
    if(firstnameVal===""){
        setErrorMsg(firstname,'firstname cannot be blank');
    }
    else{
        setSuccessMsg(firstname);
    }

    if(middlenameVal===""){
        setErrorMsg(middlename,'firstname cannot be blank');
    }
    else{
        setSuccessMsg(middlename);
    }
    
    
    // validate lastname
    if(lastnameVal===""){
        setErrorMsg(lastname,'lastname cannot be blank');
    }
    else{
        setSuccessMsg(lastname);
    }
    
    // validate email
    if(emailVal===""){
        setErrorMsg(email,'email cannot be blank');
    }else if(!isEmail(emailVal)){
        setErrorMsg(email,'Not a valid email');
    }else{
        setSuccessMsg(email);
    }
    
    // validate phonenumber
    if(phonenumberVal===""){
        setErrorMsg(phonenumber,'phonenumber cannot be blank');
    }
    else if(phonenumberVal.length!==10){
        setErrorMsg(phonenumber,'Not a valid phone number')
    }
    else{
        setSuccessMsg(phonenumber);
    }
    
    // validate dob
    if(dobVal===""){
        setErrorMsg(dob,'Date of Birth value cannot be blank');
    }else if (!isValidDob(dobVal)) {
    setErrorMsg(dob, 'You must be at least 18 years old');
    alert('Bank Account Holder must be an Adult!');
    }
    else{
        setSuccessMsg(dob);
    }
    successMsg(usernameVal);
}
    
    function setErrorMsg(input,errormsgs){
        const formControl=input.parentElement; 
        const small=formControl.querySelector('small');
        formControl.className="form-control error";
        small.innerText=errormsgs;
    }

    function setSuccessMsg(input){
        const formControl=input.parentElement;
        formControl.className="form-control success";
    }

    <!-- if(dobVal===""){
        setErrorMsg(dob,'Date of Birth value cannot be blank');
    }else if (!isValidDob(dobVal)) {
    setErrorMsg(dob, 'You must be at least 18 years old');
    alert('Bank Account Holder must be an Adult!');
    }
    else{
        setSuccessMsg(dob);
    } -->
    successMsg(usernameVal);
}


// </script>