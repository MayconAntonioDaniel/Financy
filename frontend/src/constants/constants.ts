import { ArrowUpDown, CircleArrowDown, CircleArrowUp, Tag, Utensils, Wallet } from "lucide-react";

export const INFO_CARD_DASHBOARD = [
  {
    key: 'totalBalance',
    title: 'SALDO TOTAL',
    icon: Wallet,
    styleIcon: 'size-5 text-purple-base',
  },
  {
    key: 'monthlyRevenue',
    title: 'RECEITAS DO MÊS',
    icon: CircleArrowUp,
    styleIcon: 'size-5 text-green-base',
  },
  {
    key: 'monthlyExpenses',
    title: 'DESPESAS DO MÊS',
    icon: CircleArrowDown,
    styleIcon: 'size-5 text-red-base',
  }
];

export const INFO_CARD_CATEGORIES = [
  {
    key: 'totalCategories',
    title: 'TOTAL DE CATEGORIAS',
    icon: Tag,
    styleIcon: 'size-8 text-gray-700',
  },
  {
    key: 'totalTransactions',
    title: 'TOTAL DE TRANSAÇÕES',
    icon: ArrowUpDown,
    styleIcon: 'size-8 text-purple-base',
  },
  {
    key: 'mostUsedCategory',
    title: 'CATEGORIA MAIS UTILIZADA',
    styleIcon: 'size-8 text-blue-base',
    icon: Utensils,
  },
];

export const INPUT_MENU_TYPE = [
  {
    key: 'entry',
    value: 'Entrada',
  },
  {
    key: 'exit',
    value: 'Saída',
  },
]

export const MONTH_NAMES = [
  	"Janeiro",
	"Fevereiro",
	"Marco",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
]

export const MONTH_YEAR_START_YEAR = 2026;