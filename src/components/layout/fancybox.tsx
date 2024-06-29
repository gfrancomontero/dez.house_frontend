import React, { useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import styles from './fancybox.module.scss';
import { Image } from '@nextui-org/react';

type ImageType = {
  url: string;
};

type HouseType = {
  title: string;
  images: ImageType[];
};

type LandingGalleryProps = {
  house: HouseType;
};

const LandingGallery: React.FC<LandingGalleryProps> = ({ images }) => {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {
      infinite: true,
    });

    return () => {
      NativeFancybox.unbind("[data-fancybox]");
    };
  }, []);

  return (
    <div className={`mr-2 ${styles.landingGallery}`}>
      {images.map((image, index) => (
        <a
          className={`${styles.gridItem}`}
          key={index}
          href={image.url}
          data-fancybox="gallery"
        >
          <div className={styles.innerGridItem}>
            <Image
              className={`${styles.images}`}
              shadow="sm"
              alt={`House Image ${index}`}
              radius={false}
              src={image.url}
            />
          </div>
        </a>
      ))}
    </div>
  );
};

export default LandingGallery;
