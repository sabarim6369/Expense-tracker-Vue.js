import { ref } from "vue"
import { useRouter } from "vue-router"

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const router = useRouter()

    const handleSignup = () => {
      if (!name.value || !email.value || !password.value) {
        alert("All fields are required.")
        return
      }

      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem("users")) || []

      // Check if email already exists
      const exists = users.find(user => user.email === email.value)
      if (exists) {
        alert("User with this email already exists.")
        return
      }

      // Push new user
      users.push({
        name: name.value,
        email: email.value,
        password: password.value
      })

      // Save back to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      alert("Signup successful! You can now log in.")
      router.push("/login")
    }

    return { email, password, name, handleSignup }
  }
}
