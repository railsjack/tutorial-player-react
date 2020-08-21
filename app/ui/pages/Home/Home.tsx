import React from 'react';
import useHomeViewModel from './HomeViewModel';

const Home = (props: any) => {
  const view = useHomeViewModel({ props });
  console.log('const Home');
  return (
    <div>
      <p>{view.count}</p>
      <button onClick={() => view.onPressTestButton()}>Increase</button>
    </div>
  );
};

export default Home;
