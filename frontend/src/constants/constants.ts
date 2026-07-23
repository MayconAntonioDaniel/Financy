import { ArrowUpDown, CircleArrowDown, CircleArrowUp, Tag, Utensils, Wallet, Briefcase, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket, ToolCase, PawPrint, House, Gift, Dumbbell, BookOpen, BaggageClaim, Mailbox, ReceiptText, ImageOff } from "lucide-react";

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
    type: Briefcase,
  },
  {
    key: 'carFront',
    type: CarFront,
  },
  {
    key: 'heartPulse',
    type: HeartPulse,
  },
  {
    key: 'piggyBank',
    type: PiggyBank,
  },
  {
    key: 'shoppingCart',
    type: ShoppingCart,
  },
  {
    key: 'ticket',
    type: Ticket,
  },
  {
    key: 'toolCase',
    type: ToolCase,
  },
  {
    key: 'utensils',
    type: Utensils,
  },
  {
    key: 'pawPrint',
    type: PawPrint,
  },
  {
    key: 'house',
    type: House,
  },
  {
    key: 'gift',
    type: Gift,
  },
  {
    key: 'dumbbell',
    type: Dumbbell,
  },
  {
    key: 'bookOpen',
    type: BookOpen,
  },
  {
    key: 'baggageClaim',
    type: BaggageClaim,
  },
  {
    key: 'mailbox',
    type: Mailbox,
  },
  {
    key: 'receiptText',
    type: ReceiptText,
  },
];

export const getIconByKey = (iconKey?: string) => {
  return ICONS.find((item) => item.key === iconKey)?.type ?? ImageOff;
};

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