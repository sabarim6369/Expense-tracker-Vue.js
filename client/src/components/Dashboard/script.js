import { ref,onMounted,watch, computed } from "vue"
import { useRouter } from "vue-router";
export default {
  setup() {
    const description = ref('')
    const amount = ref(null);
    const availableexpenses=ref([])
   const openpopup=ref(false);
   const router=useRouter()
    const submitExpense = () => {
      if (!description.value || !amount.value || amount.value <= 0) {
        alert("Please enter a valid description and amount.")
        return
      }

      const newExpense = {
        description: description.value,
        amount: amount.value,
        id: Date.now() // unique id
      }
const currentuser=localStorage.getItem("currentuser")

      const expenses = JSON.parse(localStorage.getItem(`expenses_${currentuser}`) || "[]")

      expenses.push(newExpense)
      localStorage.setItem(`expenses_${currentuser}`, JSON.stringify(expenses))

      alert(`Expense Added: ${newExpense.description} - $${newExpense.amount.toFixed(2)}`)

      description.value = ''
      amount.value = null
        availableexpenses.value = expenses

    }
  onMounted(()=>{
    const currentuser=localStorage.getItem("currentuser")

      availableexpenses.value = JSON.parse(localStorage.getItem(`expenses_${currentuser}`) || "[]")
  })
  const lastthreeexpenses=computed(()=>{
    return availableexpenses.value.slice(-3)
  })
  const logout=()=>{
    localStorage.removeItem("token");
    router.push("/login")
  }
    return {
      description,
      amount,
      submitExpense,
      availableexpenses,
      lastthreeexpenses,
      openpopup,
      logout
    }
  }
}
