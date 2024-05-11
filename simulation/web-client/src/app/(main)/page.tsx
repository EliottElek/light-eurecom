import { CallToAction } from '@/components/landing/CallToAction'
import { Faqs } from '@/components/landing/Faqs'
import { Footer } from '@/components/landing/Footer'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Pricing } from '@/components/landing/Pricing'
import { SecondaryFeatures } from '@/components/landing/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SecondaryFeatures />
      <CallToAction />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  )
}
