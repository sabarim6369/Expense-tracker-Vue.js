import { ref,onMounted,watch, computed } from "vue"

export default {
  setup() {
    const description = ref('')
    const amount = ref(null);
    const availableexpenses=ref([])
   const openpopup=ref(false);
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

      const expenses = JSON.parse(localStorage.getItem("expenses") || "[]")

      expenses.push(newExpense)

      localStorage.setItem("expenses", JSON.stringify(expenses))

      alert(`Expense Added: ${newExpense.description} - $${newExpense.amount.toFixed(2)}`)

      description.value = ''
      amount.value = null
        availableexpenses.value = expenses

    }
  onMounted(()=>{
      availableexpenses.value = JSON.parse(localStorage.getItem("expenses") || "[]")
  })
  const lastthreeexpenses=computed(()=>{
    return availableexpenses.value.slice(-3)
  })
    return {
      description,
      amount,
      submitExpense,
      availableexpenses,
      lastthreeexpenses,
      openpopup
    }
  }
}
