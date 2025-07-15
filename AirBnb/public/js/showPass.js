  let checkbox = document.querySelector("#checkbox");
  let showPass = document.querySelector('#showPass');

  checkbox.addEventListener('click',()=>{
    if(showPass.type === "password"){
        showPass.type = "text";
    } else{
        showPass.type = "password"
    }
  })