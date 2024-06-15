import React, {useEffect,useState} from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import Avatar, { genConfig } from 'react-nice-avatar';
import RadarChart from './RadarChart';

function Dashboard() {

  const {auth} = useAuth();
  const config = genConfig()
  const [data, setData] = useState([]);

  const fetchUserData = async () => {
     const response = await axios.get(`http://localhost:3001/skill/${auth?.id}`);
      setData(response.data);
       }
    useEffect(() => {
      fetchUserData();
    }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <Avatar className="w-32 h-32" {...config} />
        <div className=' ml-10 flex flex-col'>
          <label className='font-bold text-2xl'>Name</label>
          <h1>{auth?.name}</h1>
          <label className='font-bold text-2xl'>Position</label>
          <h2>{auth?.position}</h2>
        </div>
        <div className='ml-20'>
          <RadarChart data={data} />
        </div>

    </div>
  );
}

export default Dashboard;