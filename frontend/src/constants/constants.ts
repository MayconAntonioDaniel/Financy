import { ArrowUpDown, CircleArrowDown, CircleArrowUp, Tag, Utensils, Wallet, Briefcase, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket, ToolCase, PawPrint, House, Gift, Dumbbell, BookOpen, BaggageClaim, Mailbox, ReceiptText } from "lucide-react";

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

export const ICONS = [
  {
    key: 'briefcase',
    icon: Briefcase,
  },
  {
    key: 'carFront',
    icon: CarFront,
  },
  {
    key: 'heartPulse',
    icon: HeartPulse,
  },
  {
    key: 'piggyBank',
    icon: PiggyBank,
  },
  {
    key: 'shoppingCart',
    icon: ShoppingCart,
  },
  {
    key: 'ticket',
    icon: Ticket,
  },
  {
    key: 'toolCase',
    icon: ToolCase,
  },
  {
    key: 'utensils',
    icon: Utensils,
  },
  {
    key: 'pawPrint',
    icon: PawPrint,
  },
  {
    key: 'house',
    icon: House,
  },
  {
    key: 'gift',
    icon: Gift,
  },
  {
    key: 'dumbbell',
    icon: Dumbbell,
  },
  {
    key: 'bookOpen',
    icon: BookOpen,
  },
  {
    key: 'baggageClaim',
    icon: BaggageClaim,
  },
  {
    key: 'mailbox',
    icon: Mailbox,
  },
  {
    key: 'receiptText',
    icon: ReceiptText,
  },
];

export const COLORS = [
  {
    key: 'green',
    style: 'bg-green-base',
  },
  {
    key: 'blue',
    style: 'bg-blue-base',
  },
  {
    key: 'purple',
    style: 'bg-purple-base',
  },
  {
    key: 'pink',
    style: 'bg-pink-base',
  },
  {
    key: 'red',
    style: 'bg-red-base',
  },
  {
    key: 'orange',
    style: 'bg-orange-base',
  },
  {
    key: 'yellow',
    style: 'bg-yellow-base',
  },
]