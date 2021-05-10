import React, { useState, useEffect, useRef } from 'react';

const WRAP_BUFFER = 50;

const Carousel = ({
  shuffledCards,
  animTime=.5
}) => {
  const [index, setIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [canSlide, setCanSlide] = useState(true);

  const carousel = useRef(null);

  useEffect(() => {
    let deck = shuffledCards.map((ele) => {
      return (
        <div 
          className="carousel__item"
          key={ele.id}  
          id={ele.id}
        >
          <div className="carousel__card">
            Test {ele.id}
          </div>
        </div>
      )
    });

    if (shuffledCards.length > 0) {

      let firstCard = shuffledCards[0];
      let lastCard = shuffledCards[shuffledCards.length - 1];
      
      deck.unshift(
        <div 
          className="carousel__item"
          key="end-clone"  
        >
          <div className="carousel__card">
            Test {lastCard.id}
          </div>
        </div>
      );
      deck.push(
        <div 
          className="carousel__item"
          key="begin-clone"  
        >
          <div className="carousel__card">
            Test {firstCard.id}
          </div>
        </div>
      );
    }

    setCarouselItems(deck);
  }, [shuffledCards]);

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
      
    } else if (event.target.name === "left") {
      setIndex(idx => idx - 1);
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
        <button 
          className="left"
          onClick={(event) => handleClick(event)}
          name="left"
          disabled={!canSlide}
        >{"<"}</button>
        <button 
          className="right"
          onClick={(event) => handleClick(event)}
          name="right"
          disabled={!canSlide}
        >{">"}</button>
      </div>
    </div>
  )
}

export default Carousel;