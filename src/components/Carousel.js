import React, { useState, useEffect, useRef } from 'react';

const WRAP_BUFFER = 50;

const Carousel = ({
  leftButtonText="<",
  rightButtonText=">",
  animTime=.5,
  items,
  previousCallback,
  nextCallback,
  showButtons=true
}) => {
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [canSlide, setCanSlide] = useState(true);

  const carousel = useRef(null);

  useEffect(() => {
    let modifiedItems = items.map((ele) => {
      return (
        <div 
          className="carousel__item"
          key={ele.key}
        >
          {ele}
{/*           <div className="carousel__card">{ele}</div> */}
        </div>
      )
    });

    if (items.length > 0) {
      let firstItem = React.cloneElement(modifiedItems[0], { key: "first" });
      let lastItem = React.cloneElement(modifiedItems[modifiedItems.length - 1], { key: "last" });
      modifiedItems.unshift(lastItem);
      modifiedItems.push(firstItem);
    }

    setCarouselItems(modifiedItems);
  }, [items]);

  useEffect(() => {
    if (carouselItems.length < 3) return;

    if (index === 0 || index === carouselItems.length - 1) {
      setTimeout(() => {
        carousel.current.style.transition = "margin 0s";
        if (index === 0) {
          setIndex(carouselItems.length - 2);
        } else if (index === carouselItems.length - 1) {
          setIndex(1);
        }

      }, animTime * 1000)
    }

    if (index === 1 || index === carouselItems.length - 2) {

      /* If WRAP_BUFFER is too short, the transition will be set too soon. */
      setTimeout(() => {
        carousel.current.style.transition = "margin " + animTime + "s";
      }, WRAP_BUFFER)
    }
  }, [index, carouselItems, animTime]);

  const handleClick = (event) => {
    if (!canSlide) return;

    if (event.target.name === "right") {
      setIndex(idx => idx + 1);
      if (nextCallback != undefined) {
        nextCallback(index-1);
      }
      
    } else if (event.target.name === "left") {
      setIndex(idx => idx - 1);
      if (previousCallback != undefined) {
        previousCallback(index-1);
      }
    }
    setCanSlide(false);
    setTimeout(() => setCanSlide(true), animTime * 1000 + WRAP_BUFFER);
  }

  return (
    <div className="carousel">
      <div 
        ref={carousel}
        className="carousel__inner"
        style={{ 
          marginLeft: "calc(-100% * " + index + ")",
          width: (carouselItems.length * 100) + "%",
          transition: "margin " + animTime + "s",
       }}
      >
        {carouselItems}
      </div>
      <div className="spacer"></div>
      {showButtons ?
        <>
          <button 
            className="btn-carousel left"
            onClick={(event) => handleClick(event)}
            name="left"
            disabled={!canSlide}
          >{leftButtonText}</button>
          <button 
            className="btn-carousel right"
            onClick={(event) => handleClick(event)}
            name="right"
            disabled={!canSlide}
          >{rightButtonText}</button>
        </>
        :
        null
      }
    </div>
  )
}

export default Carousel;