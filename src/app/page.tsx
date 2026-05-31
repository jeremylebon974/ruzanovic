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

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <div className="page-wrapper">
          <Navigation />
          <main>
            <HeroSection />
            <EditorialIntro />
            <MarqueeSection />
            <CollectionSection />
            <EditorialFeature />
            <LookbookSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}