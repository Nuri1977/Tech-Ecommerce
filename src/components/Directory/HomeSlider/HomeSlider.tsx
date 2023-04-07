import React from 'react';
import './HomeSlider.scss';
import ImageSlides from './ImageSlides/ImageSlides';

const HomeSlider = () => {
  const slides = [
    {
      id: 1,
      subtitle: 'Only until february 9',
      title: 'Apple week',
      description:
        'Save even more on the newest iPhone with special carrier deals from Apple. Find out exactly how much you can save on a new iPhone today.',
      image:
        'https://cms-images.mmst.eu/2rj3gcd43pmw/61tDHQx3QwQOeBSyqXT9MH/0eecb243a6ffba5ee66e09955a8e904c/TSR_desk_angebote-aktionen-android-smartphones-mm.jpg?q=80&w=896'
    },
    {
      id: 2,
      subtitle: 'Ready for more?',
      title: 'Samsung week',
      description:
        'Save even more on the newest iPhone with special carrier deals from Apple. Find out exactly how much you can save on a new iPhone today.',
      image:
        'https://cms-images.mmst.eu/2rj3gcd43pmw/2W7z6sNBvu3lruEL4VEhzj/f629957c5beaa514b78f4c41a4a08f0c/tsr-dsk_AppleWeek-Generisch_mm.jpg?q=80&w=896'
    },
    {
      id: 3,
      subtitle: '',
      title: 'The tree goes, the PS5 comes',
      description:
        'Save even more on the newest iPhone with special carrier deals from Apple. Find out exactly how much you can save on a new iPhone today.',
      image:
        'https://cms-images.mmst.eu/2rj3gcd43pmw/5pZyDxhuQvmEtkop8mc3pp/67b34d64b9e720650077ef8784ffc7c0/MM_Teaser_Nvidia_Desktop.webp?q=80&w=896'
    },
    {
      id: 4,
      subtitle: 'Only until february 9',
      title: 'Apple week',
      description:
        'Save even more on the newest iPhone with special carrier deals from Apple. Find out exactly how much you can save on a new iPhone today.',
      image:
        'https://cms-images.mmst.eu/2rj3gcd43pmw/2jcOASkrClkPNTQGzNHTpf/24d2cbeda5009b7048dbd928b0705d30/PS_PS5_Der_Baum_geht_MM_TSR_desk_02.jpg?q=80&w=896'
    },
    {
      id: 5,
      subtitle: '',
      title: 'Masters of their trade',
      description:
        'Save even more on the newest iPhone with special carrier deals from Apple. Find out exactly how much you can save on a new iPhone today.',
      image:
        'https://cms-images.mmst.eu/2rj3gcd43pmw/2ipXBAe51QeQt1OT9yq5Eg/fd8190451ef1ec73b7e04e9a88039b35/MM_TSR_desk.jpg?q=80&w=896'
    }
  ];

  return (
    <div className="slider" data-testid="home-slider">
      <ImageSlides slides={slides} />
    </div>
  );
};

export default HomeSlider;
