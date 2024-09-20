import { CallToAction } from '@/components/landing/CallToAction'
import Features from '@/components/landing/Features'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { HeroPattern } from '@/components/landing/HeroPattern'
import LogoCloud from '@/components/landing/LogoCloud'
import { HeroDemo } from '@/components/landing/HeroDemo'
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures'
import Team from '@/components/landing/Team'

export default function Home() {

  return (
    <>
      <HeroPattern />
      <Header />
      <Hero />
      <HeroDemo />
      <LogoCloud />
      <SecondaryFeatures />
      <Features />
      <CallToAction />
      <Team />
      <Footer />
    </>
  )
}
