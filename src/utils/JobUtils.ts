class JobUtils {
  remainingDays(job) {
    const remainingDays = (job["total_hours"] / job["daily_hours"]).toFixed()
  
    const dateCorrect = String(job.create_at).slice(0, -7)

    const createdDate = new Date(dateCorrect)                   // dia criado formato normal
    const dueDay = createdDate.getDate() + Number(remainingDays)  // dia criado mais dias que faltam formato normal
    const dueDate = createdDate.setDate(dueDay)                   // dia entrega formato ms
  
    const timeDiffInMs = dueDate - Date.now()                     // dias que faltam para entrega formato ms
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

    return dayDiff
  }
  calculateBudget(valueHour, job) {
    return Number(valueHour) * Number(job)
  }
}

export { JobUtils }