import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-10'>
      <div className='pt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='flex justify-center'>
          <img src={'/chess.jpeg'} alt="Chess" className='max-w-96' />
        </div>

        <div className='pt-16 text-center mt-4'>
          <h1 className='text-4xl text-white font-bold'>Let's Play Chess on #2 Online Site</h1>
          <div className='mt-6'>
            <Button 
              onClick={() => navigate('/game')}            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
