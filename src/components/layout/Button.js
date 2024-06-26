import React from 'react'
import styles from './button.module.scss'

export default function Button( props ) {
  const { text, onPress, className } = props
  return (
    <button 
      onClick={onPress} 
      className={`${className} ${styles.button} bg-green-300 text-lg text-[#010221] hover:text-[#AA77D7] font-bold rounded-sm transition-transform transition-shadow hover:shadow-lg hover:shadow-green-300 ${className} ${styles.button}`}
      >{text}</button>
  )
}