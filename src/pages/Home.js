import supabase from '../config/supabaseClient';
import { useState, useEffect } from 'react';
import SmoothieCard from '../components/SmoothieCard';

const Home = () => {
  //console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await await supabase.from('smoothies').select(); // table name

      if (error) {
        setFetchError('Could not fetch the smoothies');
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);

  return (
    <div className='page home'>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className='smoothies'>
          <div className='smoothie-grid'>
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
