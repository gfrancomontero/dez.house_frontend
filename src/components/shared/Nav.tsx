import React from 'react';
import styles from './nav.module.scss'
import Link from 'next/link'

const Nav:React.FC = () => {

  const links: { link: string, text: string }[] = [
    { link: 'how-it-works', text: 'HOW IT WORKS'},
    { link: 'new-house', text: 'LIST YOUR HOUSE'}
  ]

  return (
    <div className={`${styles.nav} text-white flex flex-row mb-28`}>
      {links.map((item, index) => (
        <Link className="ml-6 transition-ease" key={index} href={`/${item.link}`}>{item.text}</Link>
      ))}
    </div>
  )
}

export default Nav;