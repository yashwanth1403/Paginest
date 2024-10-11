"use client";

const Random = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  return <div>Random number: {randomNumber}</div>;
};

export default Random;
