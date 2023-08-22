import React, { useState, useEffect, useRef, MouseEvent } from 'react'

interface DropdownProps {
  //   options: string[];
  //   onSelect: (selectedOption: string) => void
  children: React.ReactNode
  classStyle?: string
  classStyleChildren?: string
  classStyleOptions?: string
  options: () => any
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  children,
  classStyle,
  classStyleChildren,
  classStyleOptions
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={dropdownRef} className={`relative ${classStyle}`}>
      <button onClick={toggleDropdown} className={`rounded p-2 focus:outline-none ${classStyleChildren}`}>
        {children}
      </button>
      {isOpen && (
        <div className={`absolute right-0 top-full ${classStyleOptions}`} onClick={() => setIsOpen(false)}>
          {options()}
        </div>
      )}
    </div>
  )
}

export default Dropdown
