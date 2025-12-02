const signupform = document.getElementById("signupform");
const password = document.getElementById("password");
const email = document.getElementById("email");
const fullname = document.getElementById("fullname");


signupform.addEventListener("submit", async (e)=>{
console.log("submit clicked");
        e.preventDefault();
        
 Swal.fire({
            icon:"info",
            title:"Please wait Creating...",
            text:`Creating your account for CyberAnya 4.0`,
            showConfirmButton:false,
              allowOutsideClick: false,

               didOpen: () => {
                 Swal.showLoading();
                }

        });

     if(email.value){

    const res = await fetch("https://tools.atrox.in/signup",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({fullname:fullname.value,email:email.value,password:password.value})
    });


    const data = await res.json();
    // console.log(data.oemail);
      //  console.log(data);

if (data.success==false) {
    console.log(data);
    
        Swal.fire({
            icon:"error",
            title:"Signup error",
            text:`Account creation error , try again`
        });
       
    }  

    
if (data.success==true) {
    console.log(data);
    
        Swal.fire({
            icon:"success",
            title:"Signup successfull",
            text:`Account creation successfull , Login now`,
            showConfirmButton:true
        }).then(() => {
  window.location.href = "/login"; // redirect here
});
       
    }  

if(data.emailok==false){
    console.log(data,"email allredy exist");
    
        Swal.fire({
            icon:"error",
            title:data.message,
            text:`Email ${data.email} allredy registerd`
        });
    
}

     }
})




async function sendOtp(){
      const emailid = document.getElementById("email");
            const otpbtn = document.getElementById("sbtn");

            Swal.fire({
            icon:"info",
            title:"Please wait Sending OTP...",
            text:`Sending OTP to your email ${emailid.value}.`,
            showConfirmButton:false,
            
              allowOutsideClick: false,
               didOpen: () => {
    Swal.showLoading();
  }


        });
    if(emailid.value){
    const res = await fetch("http://localhost:3000/signup/sendotp",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({email:emailid.value})
    });

    

    const data = await res.json();
    // console.log(data.oemail);
        console.log(data);

if (data.aemail==true) {
    console.log(data);
    
        Swal.fire({
            icon:"error",
            title:data.message,
            text:`Your email ${data.oemail}`
        });
} 
    

else if(!data.aemail){

        Swal.fire({
            icon:"success",
            title:data.message,
            text:`Check your email ${data.oemail}`
        });

        otpbtn.disabled= true;
        otpbtn.style.backgroundColor="green";
        otpbtn.innerText="SENT";

            let time = 120;  // seconds
    window.timer = setInterval(() => {
        time--;
        otpbtn.textContent = `${time} sec`;

        if (time <= 0) {
            clearInterval(window.timer);
            otpbtn.disabled = false;
            otpbtn.textContent = "Resend";
            otpbtn.style.backgroundColor="#007AFF";

        }
    }, 1000);

}
        
     }else{
        
        Swal.fire({
            icon:"error",
            title:"Enter Your Email id",
            text:"Try Again..."
        });
        
     }
    
    
    }


async function verifyOtp(){
      const emailotp = document.getElementById("otp");
      const emailid = document.getElementById("email");
      const signupbtn = document.getElementById("signupbtn");

            const verifybtn = document.getElementById("vbtn");
            const otpbtn = document.getElementById("sbtn");

let res;

    if(emailotp.value){
     res = await fetch("/signup/verifyotp",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({emailid:emailid.value,otp:emailotp.value})
    });

} else if(emailotp.value==""){
            Swal.fire({
            icon:"error",
            title:"Enter email otp",
            text:`First enter your email otp, try again...`
        });
        return;
}

  
     //console.log(data.oemail);

  
    
  const data = await res.json();
 try {

    if(data.verification){
        Swal.fire({
            icon:"success",
            title:"Email OTP verified!",
            text:`Your email  ${data.email} is verified.`
        });
            clearInterval(timer);
    clearInterval(window.timer);

        otpbtn.disabled= true;
        otpbtn.style.backgroundColor="green";
        otpbtn.innerText="SENT";
        otpbtn.style.display="none";
        emailotp.disabled=true;
        verifybtn.disabled= true;
        verifybtn.style.backgroundColor="green";
        verifybtn.innerText="Verified";
        emailid.disabled=true;
        signupbtn.disabled=false;
        signupbtn.style.backgroundColor="#FF9933";

     }else{
        
        Swal.fire({
            icon:"error",
            title:"Wrong OTP",
            text:"Email OTP verification faield"
        });
        
     }
       } catch (error) {
    console.log(error);
    
   } 
    

}
