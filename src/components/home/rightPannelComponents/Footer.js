import React from 'react'
import {Image} from "@nextui-org/image";
import {Code} from "@nextui-org/react";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-center items-center align-center text-white mb-18">
      <Image className="mb-8 w-full whitespace-wrap" width={80} alt="NextUI hero Image" src={`/me.png`} />
      <p className="mb-8 max-w-[500px] whitespace-wrap text-slate-400 text-lg text-justify w-full">
        Even though I&apos;m not actively seeking new opportunities right now, my inbox is always open. If you have a question or just want to say hello, I&apos;ll do my best to respond!
      </p>

      <a href="mailto:hey@gonzalofranco.com" target="_blank">
        <Code>mailto:hey@gonzalofranco.com</Code>
      </a>
      <p className="mt-8 text-slate-400 text-sm w-full text-center">
        Built with ♥ on NextJS
      </p>
      <p className="mt-8 text-slate-600 text-sm w-full text-center">
        Design credits go to <Link href="www.github.com/bchiang7" target="_blank" className="text-green-500 opacity-80 cursor-pointer hover:text-green-300 transition">Brittany Chiang</Link>, whom I totally copied this from,<br />with the naked eye, and admiration for her great work.
      </p>
    </div>
  )
}