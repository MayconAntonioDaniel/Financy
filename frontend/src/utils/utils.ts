const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function parseCurrencyToCentsBRL(value: string) {
  const digits = value.replace(/\D/g, "")
  return digits ? Number(digits) : 0
}

export function formatCentsToCurrencyBRL(valueInCents: number) {
  return formatCurrencyBRL(valueInCents / 100)
}

export function formatCurrencyBRL(value: number) {
  return brlCurrencyFormatter.format(value)
}