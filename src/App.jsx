import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokeBall from './resources/pokeball.svg'
import Search from './resources/search.svg'
import Poke from './Poke.jsx';

export const capitalize = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
function App() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const searchPoke = async (name) => {
    try{
      if (!name.trim()) return;

      setLoading(true);
      setPokemon(null);

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error("Pokemon not found!");
      }


      const data = await response.json();
      setPokemon(data);
    }
    catch (err) {
      console.log(err.message);
      setPokemon(null);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    searchPoke(searchTerm);
  },[searchTerm]);
  useEffect(() => {
  console.log(pokemon);
  },[pokemon]);

  return (
    <div className="min-h-screen w-full md:w-screen flex flex-col">
      <div className="flex md:items-center bg-[#ffdcdc] h-[15vh] border-8 border-black md:p-5 w-full justify-between">
        <div className="flex items-center">
          <img
          src={PokeBall}
          className="md:w-25 w-20"
          />
          <p className="font-bold text-black flex text-2xl md:text-6xl pixel"> POKEDEX </p>
        </div>
        <div className="flex items-center">
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="pixel text-black border-black border-3 h-10 w-[9rem] md:w-[20rem] placeholder:text-gray-800 pl-4 placeholder:pixel" placeholder="ENTER A POKEMON"/>
          <img
          className="md:pl-3"
          src={Search}
          width={53}
          onClick={() => setSearchTerm(input)}
          />
        </div>
      </div>
      {loading? (
        <div className='flex items-center justify-center h-[85vh]'>
        <p className='text-amber-950 text-center md:text-6xl text-2xl pixel'> Please Wait </p>
      </div>
      ): pokemon? (
        <div className='flex  min-h-[85vh]'>
        <Poke {...pokemon}/>
      </div>
      ):
       searchTerm? (
      <div className='flex items-center justify-center h-[85vh]'>
        <p className='text-amber-950 md:text-6xl text-2xl text-center pixel'> Pokemon not found. </p>
      </div>
      ):
      (
        <div className='flex items-center justify-center h-[85vh]'>
        <p className='text-amber-950 md:text-6xl text-2xl text-center pixel'> Enter a pokemon's name. </p>
      </div>
      )
      }
    </div>
  )
}

export default App
