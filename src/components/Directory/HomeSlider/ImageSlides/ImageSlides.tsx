import { useState } from 'react';
import './ImageSlides.scss';
import { RxDotFilled } from 'react-icons/rx';
import { GoPrimitiveDot } from 'react-icons/go';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

const ImageSlides = ({ slides }: { slides: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previosSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="slide">
      <div className="slideCard">
        <div className="slideInfo">
          <h3 className="slideSubtitle">{slides[currentIndex].subtitle}</h3>
          <h1 className="slideTitle">{slides[currentIndex].title}</h1>
          <h4 className="slideDescription">{slides[currentIndex].description}</h4>
        </div>
        <div className="slideImage">
          <img src={slides[currentIndex].image} alt={slides[currentIndex].title} />
        </div>
      </div>
      <div className="slideNavigation">
        <div className="slideDots">
          {slides.map((slide: any, index: number) => (
            <div key={index} onClick={() => setCurrentIndex(index)} data-testid="slide">
              {index === currentIndex ? (
                <GoPrimitiveDot color="red" fontSize={30} />
              ) : (
                <RxDotFilled color="#cfcbca" fontSize={30} />
              )}
            </div>
          ))}
        </div>
        <div className="slideButtons">
          <div onClick={previosSlide} data-testid="previos-slide">
            <FaChevronLeft
              style={{
                fontSize: '20px',
                color: '#cfcbca'
              }}
            />
          </div>
          <div onClick={nextSlide} data-testid="next-slide">
            <FaChevronRight fontWeight="bolder" color="#cfcbca" fontSize={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlides;
