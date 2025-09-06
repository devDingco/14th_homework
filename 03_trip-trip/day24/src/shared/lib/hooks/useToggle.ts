'use client'

import { useState } from 'react'

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  return { isOpen, handleToggle }
}
