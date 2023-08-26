import React, { useState } from 'react';

function Slides() {

    const slides = [{
        "title" : "Amageddon",
        "text":"real",
    },
    {
        "title" : "sola",
        "text":"regowayaal",
    },
    {
        "title" : "victor",
        "text":"reokayal",
    },
]
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = slides.length;

  function prevSlide() {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  }

  function nextSlide() {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  }

  function restartSlides() {
    setCurrentSlide(0);
  }

  const { title, text } = slides[currentSlide];

  return (
    <div>
      <div id="navigation" className="text-center">
        <button onClick={restartSlides} data-testid="button-restart" className="small outlined">
          Restart
        </button>
        <button onClick={prevSlide} data-testid="button-prev" className="small">
          Prev
        </button>
        <button onClick={nextSlide} data-testid="button-next" className="small">
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{title}</h1>
        <p data-testid="text">{text}</p>
      </div>
    </div>
  );
}

export default Slides;
