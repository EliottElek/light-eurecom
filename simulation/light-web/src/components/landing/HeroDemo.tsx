'use client'

import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import demo from '../../demos/home.json'
import { Container } from '@/components/landing/Container'
import Canva from '../canvas/HeroCanva/Canva'


export function HeroDemo() {
  let [activeDemo, setactiveDemo] = useState<'With' | 'Without'>(
    'With',
  )
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="py-20 sm:py-32 hidden md:block"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-medium tracking-tight"
          >
            See by yourself.
          </h2>
          <p className="mt-2 text-xl font-bold text-primary">
            50% less data transmitted with LIGHT-VoD.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <RadioGroup
              value={activeDemo}
              onChange={setactiveDemo}
              className="grid grid-cols-2"
            >
              {['With', 'Without'].map((period) => (
                <RadioGroup.Option
                  key={period}
                  value={period}
                  className={clsx(
                    'cursor-pointer border px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm outline-2 outline-offset-2 transition-colors text-center hover:border-gray-400',
                    period === 'With'
                      ? 'rounded-l-lg'
                      : '-ml-px rounded-r-lg',
                  )}
                >
                  {period}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                'pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-primary transition-all duration-300',
                activeDemo === 'With'
                  ? '[clip-path:inset(0_50%_0_0)]'
                  : '[clip-path:inset(0_0_0_calc(50%-1px))]',
              )}
            >
              {['With', 'Without'].map((period) => (
                <div
                  key={period}
                  className={clsx(
                    'py-2 text-center text-sm font-semibold text-white',
                    period === 'Without' && '-ml-px',
                  )}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Canva data={activeDemo === "With" ? demo[0] : demo[1]} />
      </Container>
    </section>
  )
}
