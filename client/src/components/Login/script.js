import { ref } from "vue"
import { useRouter } from "vue-router"

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleLogin = () => {
      const allUsers = JSON.parse(localStorage.getItem("users")) || []

      if (allUsers.length === 0) {
        alert("No users found. Please sign up first.")
        return
      }

      const matchedUser = allUsers.find(
        user => user.email === email.value && user.password === password.value
      )

      if (matchedUser) {
        alert("Login successful!")
        localStorage.setItem("token", "hello") // Dummy token
        localStorage.setItem("currentuser", matchedUser.email)
        router.push("/dashboard")
      } else {
        alert("Invalid email or password.")
      }
    }

    return { email, password, handleLogin }
  }
}
