import { ref } from "vue"
import { useRouter } from "vue-router"

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"))

      if (!savedUser) {
        alert("No user found. Please sign up first.")
        return
      }

      if (email.value === savedUser.email && password.value === savedUser.password) {
        alert("Login successful!")
        localStorage.setItem("token","hello")
        router.push("/dashboard")  
      } else {
        alert("Invalid email or password.")
      }
    }

    return { email, password, handleLogin }
  }
}
