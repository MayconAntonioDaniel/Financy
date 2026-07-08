import { Toaster } from '@/components/ui/sonner'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-100">
      <main className="mx-auto">
        {children}
      </main>
      <Toaster />
    </div>
  )
}