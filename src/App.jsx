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
      <div className="flex items-center bg-[#ffdcdc] h-[15vh] border-8 border-black p-5 w-[100%] justify-between">
        <div className="flex items-center">
          <img
          src={PokeBall}
          width={80}
          className="md:w-25"
          />
          <p className="font-bold text-black flex text-3xl md:text-6xl pixel p-8"> POKEDEX </p>
        </div>
        <div className="flex items-center">
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="pixel text-black border-black border-3 h-10 w-[17rem] md:w-[20rem] placeholder:text-gray-800 pl-4 placeholder:pixel" placeholder="ENTER A POKEMON"/>
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
        <h1 className='text-amber-950 text-center pixel'> Please Wait </h1>
      </div>
      ): pokemon? (
        <div className='flex  min-h-[85vh]'>
        <Poke {...pokemon}/>
      </div>
      ):
       searchTerm? (
      <div className='flex items-center justify-center h-[85vh]'>
        <h1 className='text-amber-950 text-center pixel'> Pokemon not found. </h1>
      </div>
      ):
      (
        <div className='flex items-center justify-center h-[85vh]'>
        <h1 className='text-amber-950 text-center pixel'> Enter a pokemon's name. </h1>
      </div>
      )
      }
    </div>
  )
}

export default App
