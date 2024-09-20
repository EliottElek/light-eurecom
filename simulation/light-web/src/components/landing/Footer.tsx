import { Container } from '@/components/landing/Container'
import { Logomark } from '@/components/landing/Logo'
import { NavLinks } from '@/components/landing/NavLinks'
import { ModeToggle } from '../ThemeSwitcher'


export function Footer() {
  return (
    <footer className="border-t ">
      <Container>
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center">
              <Logomark />
              <div className="ml-4">
                <p className="text-base font-semibold">Light VOD</p>
                <p className="mt-1 text-sm">Cache-aided multicasting for Reducing VoD Loads in Networks.</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">
              <NavLinks />
            </nav>
          </div>
        </div>
        <div className="flex flex-col items-center border-t pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">
          <div>
            <ModeToggle />
          </div>
          <p className="mt-6 text-sm opacity-75 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
