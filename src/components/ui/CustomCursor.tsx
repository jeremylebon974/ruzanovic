'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const circle = circleRef.current
    if (!dot || !circle) return

    let mouseX = 0
    let mouseY = 0
    let circleX = 0
    let circleY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const handleMouseEnterHoverable = () => {
      circle.classList.add('is-hovering')
    }

    const handleMouseLeaveHoverable = () => {
      circle.classList.remove('is-hovering')
    }

    let animFrameId: number
    const animateCircle = () => {
      circleX += (mouseX - circleX) * 0.12
      circleY += (mouseY - circleY) * 0.12
      circle.style.left = `${circleX}px`
      circle.style.top = `${circleY}px`
      animFrameId = requestAnimationFrame(animateCircle)
    }
    animateCircle()

    window.addEventListener('mousemove', handleMouseMove)

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterHoverable)
      el.addEventListener('mouseleave', handleMouseLeaveHoverable)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameId)
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterHoverable)
        el.removeEventListener('mouseleave', handleMouseLeaveHoverable)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={circleRef} className="cursor-circle hidden md:block" />
    </>
  )
}
