export interface User {
  id: string
  name: string
  email: string
  role?: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface Category {
  id: string
  title: string
  description?: string
  icon: string
  color: string
  numberOfItems: number
  authorId: string
  author?: User
  createdAt?: string
  updatedAt?: string
}

export interface Transaction {
  id: string
  amount: number
  description: string
  type: string
  date: string
  authorId: string
  author?: User
  categoryId: string
  category?: Category
  createdAt?: string
  updatedAt?: string
}