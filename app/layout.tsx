import { Providers } from './providers'
import '../globals.css'
import CustomNavbar from '@/components/layout/navbar'
import CustomFooter from '@/components/layout/footer'

export const metadata = {
  title: 'wagmi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CustomNavbar/>
          <main className='min-h-screen min-w-screen'>
            {children}
          </main>
          <CustomFooter/>
          </Providers>
      </body>
    </html>
  )
}

