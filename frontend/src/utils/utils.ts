import { MONTH_YEAR_START_YEAR, MONTH_NAMES } from "@/constants/constants";

export type MonthYearItem = {
	month: string;
	year: number;
	label: string;
};

export function getMonthYearItems(startYear = MONTH_YEAR_START_YEAR): MonthYearItem[] {
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonthIndex = now.getMonth();

	if (startYear > currentYear) {
		return [];
	}

	const result: MonthYearItem[] = [];

	for (let year = startYear; year <= currentYear; year += 1) {
		const lastMonthIndex = year === currentYear ? currentMonthIndex : 11;

		for (let monthIndex = 0; monthIndex <= lastMonthIndex; monthIndex += 1) {
			const month = MONTH_NAMES[monthIndex];

			result.push({
				month,
				year,
				label: `${month} / ${year}`,
			});
		}
	}

	return result;
}
