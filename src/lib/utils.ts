import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { StatusType } from '@/types/supabase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function formatStatus(status: StatusType): string {
  const statusMap: Record<StatusType, string> = {
    ativo: 'Ativo',
    pendente: 'Pendente',
    suspenso: 'Suspenso',
    inativo: 'Inativo'
  }
  return statusMap[status] || status
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export function getMetaTitle(title: string): string {
  return `${title} | Portal Maria Helena`
}

export function getMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength - 3) + '...'
}
