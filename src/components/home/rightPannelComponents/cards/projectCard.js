"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './card.module.scss';
import { Chip } from '@nextui-org/react';  // Ensure the import path matches the installed package
import {Image} from "@nextui-org/image";


const ProjectCard = ({ project }) => {

  const { position, title, cover, github, external, tech, description } = project;

  // State to track if the card is in focus
  const [isInFocus, setIsInFocus] = useState(false);

  // Ref for the card element
  const cardRef = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInFocus(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7, // Trigger when 100% of the card is in the viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Clean up the observer
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isInFocus ? styles.infocus : ''} cursor-default text-slate-400 transition my-6 flex flex-col ${position%2 == 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'} rounded-lg p-6`}
    >
      <div className={`${styles.position} transition uppercase ${position%2 == 0 ? 'mr' : 'ml'}-4 min-w-[160px] mb-4 flex flex-col justify-center	`}>
        <Image width={300} alt="NextUI hero Image" src={`projects/${cover}`} />
      </div>
      <div className={`${styles.content} text-left text-sm flex-1`}>
        <h3 className="text-slate-200 text-lg">
          {title} {' '}
        </h3>
        <p className="cursor-default text-justify text-slate-200 text-md mb-2 mt-4">{description.join(' ')}</p>
        <div className="flex flex-wrap mt-6">
          {tech &&
            tech.map((skill, index) => (
              <span key={index} className="mr-2 mb-2 font-mono text-green-300 cursor-default transition text-green-300">
                {skill}
              </span>
            ))}
        </div>
        <Link href={external} target="_blank" className="transition mt-2 mb-4 flex flex-row align-center items-center">
          {github == external ? (
            <div className="transition mt-2 mb-4 flex flex-row align-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 mr-4" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
              <span className="text-green-300">Fork Repo</span>
            </div>
          ) : 'View Project'}
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
