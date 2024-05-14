import { CallToAction } from '@/components/landing/CallToAction'
import { Faqs } from '@/components/landing/Faqs'
import Features from '@/components/landing/Features'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { HeroPattern } from '@/components/landing/HeroPattern'
import LogoCloud from '@/components/landing/LogoCloud'
import { Pricing } from '@/components/landing/Pricing'
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures'
import Team from '@/components/landing/Team'

export default function Home() {
  return (
    <>
      <HeroPattern />
      <Header />
      <Hero />
      <LogoCloud />
      <SecondaryFeatures />
      <Features />
      <CallToAction />
      <Team />
      <Footer />
    </>
  )
}
