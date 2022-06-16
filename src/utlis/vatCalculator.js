const vatCalculator = {
    calculateVAT: (netAmound)=>{
        return Math.round((netAmound * 0.20) * 1e2) / 1e2
    },

    calculateGrossAmound : (netAmound) => {
        return Math.round((netAmound * 1.20) * 1e2) / 1e2
    },

    calculateNetAmound : (grossAmound) => {
        return Math.round((grossAmound  / 1.20) * 1e2) / 1e2
    }
}



module.exports = vatCalculator