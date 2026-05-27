'use client'

import { useState } from 'react'
import IntroScreen from '@/components/sections/IntroScreen'
import Navigation from '@/components/layout/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import EditorialIntro from '@/components/sections/EditorialIntro'
import MarqueeSection from '@/components/sections/MarqueeSection'
import CollectionSection from '@/components/sections/CollectionSection'
import EditorialFeature from '@/components/sections/EditorialFeature'
import LookbookSection from '@/components/sections/LookbookSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <CustomCursor />

      {/* Intro cinématographique */}
      <IntroScreen onComplete={() => setIntroComplete(true)} />

      {/* Site principal */}
      {introComplete && (
        <div className="page-wrapper">
          <Navigation />

          <main>
            {/* 1. Hero fullscreen */}
            <HeroSection />

            {/* 2. Manifeste éditorial */}
            <EditorialIntro />

            {/* 3. Ticker marquee */}
            <MarqueeSection />

            {/* 4. Collection grid */}
            <CollectionSection />

            {/* 5. Editorial feature - pleine page */}
            <EditorialFeature />

            {/* 6. Lookbook asym */}
            <LookbookSection />

            {/* 7. Contact */}
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
