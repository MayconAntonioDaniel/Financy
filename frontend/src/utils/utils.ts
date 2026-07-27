const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export function formatCurrencyBRL(value: number) {
	return brlCurrencyFormatter.format(value);
}

export function formatCurrencyFromInputBRL(value: string) {
	const digits = value.replace(/\D/g, "");

	if (!digits) {
		return "";
	}

	const numericValue = Number(digits) / 100;
	return formatCurrencyBRL(numericValue);
}

export function parseCurrencyToNumberBRL(value: string) {
	const digits = value.replace(/\D/g, "");
	return digits ? Number(digits) / 100 : 0;
}
