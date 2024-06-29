import React, { useEffect, useRef } from 'react';
import { Fancybox as FancyboxInstance } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type FancyBoxProps = {
  images: { url: string }[];
};

const FancyBox: React.FC<FancyBoxProps> = ({ images }) => {
  const fancyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    FancyboxInstance.bind("[data-fancybox]", {
      infinite: true,
    });

    return () => {
      FancyboxInstance.destroy();
    };
  }, []);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (fancyBoxRef.current) {
      fancyBoxRef.current.addEventListener('click', stopPropagation);
    }
    return () => {
      if (fancyBoxRef.current) {
        fancyBoxRef.current.removeEventListener('click', stopPropagation);
      }
    };
  }, [fancyBoxRef]);

  return (
    <div ref={fancyBoxRef}>
      {images.length > 0 && (
        <a href={images[0].url} data-fancybox="gallery">
          <img src={images[0].url} alt="Main Image" className="object-cover w-full h-48 rounded-lg" />
        </a>
      )}
      <div style={{ display: 'none' }}>
        {images.slice(1).map((image, index) => (
          <a key={index + 1} href={image.url} data-fancybox="gallery">
            <img src={image.url} alt={`Image ${index + 1}`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FancyBox;
