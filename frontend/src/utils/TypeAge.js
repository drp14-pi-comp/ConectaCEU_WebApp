
// Função para classificar o usuário de acordo com idade.
export const getAgeType = (dateBirth) => {
    if (!dateBirth) return null 

    const today = new Date() // Data atual.
    const birth = new Date(dateBirth) // Data de nascimento do usuário.

    let age = today.getFullYear() - birth.getFullYear() 

    const monthDiff = today.getMonth() - birth.getMonth()

    // Ajusta a idade caso ainda não tenha feito aniversário no ano atual.
    if (
      monthDiff < 0 || 
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    if (age < 18) return "minor" // Menor de idade
    if (age >= 70) return "elderly" // Idoso 
    return "adult" // Adulto
  }