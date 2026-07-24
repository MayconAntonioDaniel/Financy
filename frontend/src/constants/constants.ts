import { ArrowUpDown, CircleArrowDown, CircleArrowUp, Tag, Utensils, Wallet, CarFront, HeartPulse, PiggyBank, ShoppingCart, Ticket, House, Gift, Dumbbell, ReceiptText, CircleDollarSign, PlaneTakeoff, Wrench, TvMinimalPlay, Hamburger, BanknoteArrowDown } from "lucide-react";

export const ITEMS_PER_PAGE = 10;

export const TABLE_HEADERS_TRANSACTIONS = [
  { key: 'description', title: 'DESCRIÇÃO', align: 'start' },
  { key: 'date', title: 'DATA', align: 'center' },
  { key: 'category', title: 'CATEGORIA', align: 'center' },
  { key: 'type', title: 'TIPO', align: 'center' },
  { key: 'amount', title: 'VALOR', align: 'end' },
  { key: 'actions', title: 'AÇÕES', align: 'end' },
];

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
    key: 'utensils',
    type: Utensils,
  },
  {
    key: 'carFront',
    type: CarFront,
  },
  {
    key: 'shoppingCart',
    type: ShoppingCart,
  },
  {
    key: 'piggyBank',
    type: PiggyBank,
  },
  {
    key: 'heartPulse',
    type: HeartPulse,
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
    key: 'ticket',
    type: Ticket,
  },
  {
    key: 'circleDollarSign',
    type: CircleDollarSign,
  },
  {
    key: 'planeTakeoff',
    type: PlaneTakeoff,
  },
  {
    key: 'wrench',
    type: Wrench,
  },
  {
    key: 'tvMinimalPlay',
    type: TvMinimalPlay,
  },
  {
    key: 'hamburger',
    type: Hamburger,
  },
  {
    key: 'banknoteArrowDown',
    type: BanknoteArrowDown,
  },
  {
    key: 'receiptText',
    type: ReceiptText,
  },
];

export const COLORS = [
  { key: 'green' },
  { key: 'blue' },
  { key: 'purple' },
  { key: 'pink' },
  { key: 'red' },
  { key: 'orange' },
  { key: 'yellow' },
]

export const CATEGORY_COLOR_STYLES: Record<string, { bgLight: string; textBase: string }> = {
  green: {
    bgLight: 'bg-green-light',
    textBase: 'text-green-base',
  },
  blue: {
    bgLight: 'bg-blue-light',
    textBase: 'text-blue-base',
  },
  purple: {
    bgLight: 'bg-purple-light',
    textBase: 'text-purple-base',
  },
  pink: {
    bgLight: 'bg-pink-light',
    textBase: 'text-pink-base',
  },
  red: {
    bgLight: 'bg-red-light',
    textBase: 'text-red-base',
  },
  orange: {
    bgLight: 'bg-orange-light',
    textBase: 'text-orange-base',
  },
  yellow: {
    bgLight: 'bg-yellow-light',
    textBase: 'text-yellow-base',
  },
};