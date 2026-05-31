'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) return

    let mouseX = 0, mouseY = 0
    let circleX = 0, circleY = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      circleX += (mouseX - circleX) * 0.1
      circleY += (mouseY - circleY) * 0.1
      circle.style.transform = `translate(${circleX}px, ${circleY}px)`
      animId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={circleRef} className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
    </>
  )
}