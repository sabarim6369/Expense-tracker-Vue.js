import { ref } from "vue"
import { useRouter } from "vue-router";
export default{
    setup(){   
        const email=ref('');
        const password=ref('');
        const name=ref('');
        const router=useRouter()
       const handleSignup = () => {
  if (!name.value || !email.value || !password.value) {
    alert("All fields are required.")
    return;
  }

  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  localStorage.setItem("user", JSON.stringify(userData))

  alert("Signup successful! You can now log in.")
  router.push("/login")
}
      return{email,password,name,handleSignup};
    }
}