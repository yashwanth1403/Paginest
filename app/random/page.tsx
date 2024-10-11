import { useEffect, useState } from "react";

const Random = () => {
  const [random, setRandom] = useState<number>(0);
  useEffect(() => {
    const random = Math.floor(Math.random() * 1000) + 1;
    setRandom(random);
  }, [random]);
  return <div>Random number:{random}</div>;
};

export default Random;
