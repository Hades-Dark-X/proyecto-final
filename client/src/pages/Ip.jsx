import { useState } from 'react';
import axios from 'axios';

export const IpLookup= ()=> {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      setData(null);
      setError('Error al obtener la información');
    }
  };

  return (
    <section className= 'flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <h1>Buscador de información de IP</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Ingresa una IP'/>
        <button type="submit" className='bg-sky -500 px-4 py-1 rounded-sm'>Buscar</button>
      </form>
      
      {data && (
        <div className='my-3'>
          <p>IP consultada: {data.query}</p>
          <p>Status: {data.status}</p>
          <p>País: {data.country}</p>
          <p>Código de País: {data.countryCode}</p>
          <p>Ciudad: {data.city}</p>
          <p>ISP: {data.isp}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
    </section>
  );
}

