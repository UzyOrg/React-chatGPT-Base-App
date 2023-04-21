import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleButtonClick}>Increase Count</button>
    </div>
  );
};

export default MyComponent;
