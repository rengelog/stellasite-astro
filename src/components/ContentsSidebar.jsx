import React, { useState, useEffect } from 'react';

function switchContent(index) {
  const content = contents[index];
  if (content) {
    content.classList.remove('active');
    content.classList.add('fade-in');
  }
}

const ContentsSidebar = ({ contents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const switchContent = (index) => {
    setCurrentIndex(index);
  };

  const prevButtonHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contents.length) % contents.length);
  };

  const nextButtonHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  return (
    <div suppressHydrationWarning className="contents-slide">
      {isClient && (
        contents.map((content, index) => (
          <div key={content.id} className={`content ${currentIndex === index ? 'active' : ''}`}>
            <h2>{content.title}</h2>
            <a href={content.url}>
              {content.image && (
                <img src={content.image} alt={content.alt} />
              )}
            </a>
            <p>{content.text}</p>
          </div>
        ))
      )}
      <div id="nav-icons">
        <button id="prev-button" onClick={prevButtonHandler}>
          <i className="material-icons icon-position">keyboard_arrow_left</i>
        </button>
        <button id="next-button" onClick={nextButtonHandler}>
          <i className="material-icons icon-position">keyboard_arrow_right</i>
        </button>
      </div>
    </div>
  );
};

export default ContentsSidebar;
