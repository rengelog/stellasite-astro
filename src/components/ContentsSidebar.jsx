import React, { useState, useEffect } from 'react';

const ContentsSidebar = ({ contents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // 初期マウント時にアニメーションをトリガー
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSlideChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  const prevButtonHandler = () => {
    handleSlideChange((currentIndex - 1 + contents.length) % contents.length);
  };

  const nextButtonHandler = () => {
    handleSlideChange((currentIndex + 1) % contents.length);
  };

  // アニメーション用クラスを動的に付与
  const getSlideClasses = (index) => {
    let classes = 'slides_c';
    if (index === currentIndex) classes += ' active';
    if (isMounted) classes += ' mounted';
    return classes;
  };

  return (
    <div className="contents-slide">
      {contents.map((content, index) => (
        <div 
          key={content.id}
          className={getSlideClasses(index)}
          style={{ 
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <h2>{content.title}</h2>
          <a href={content.url}>
            {content.image && (
              <img src={content.image} alt={content.alt} />
            )}
          </a>
          <p>{content.text}</p>
        </div>
      ))}

      <div id="nav-icons">
        <button className="prev-button" onClick={prevButtonHandler}>
          <i className="material-icons icon-position">keyboard_arrow_left</i>
        </button>
        <button className="next-button" onClick={nextButtonHandler}>
          <i className="material-icons icon-position">keyboard_arrow_right</i>
        </button>
      </div>
    </div>
  );
};

export default ContentsSidebar;
