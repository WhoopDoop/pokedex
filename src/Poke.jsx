    import { useState, useEffect, useRef } from 'react';
    import './App.css';
    import { capitalize } from './App.jsx';
    import Rotate from './resources/rotate.svg';
    const getBarColor = (value) => {
        if (value<50) return 'bg-red-500';
        if (value<90) return 'bg-yellow-500';
        return 'bg-green-500';
    }


    const Pokemon = ( poke ) => {
        if (!poke) return null;
        const audioRef = useRef(null);
        const [turned, setTurned] = useState(false);
        useEffect(() => {
        audioRef.current = new Audio(poke.cries.latest);
        }, [poke]);

        const playCry = () => {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }

        const sprite = turned
        ? poke.sprites.back_default
        : poke.sprites.front_default;
        return (
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center">
                    <img
                    src={sprite}
                    className='w-52 h-52 md:w-80 md:h-80 border-black border-6 m-4' 
                    />
                    <img src={Rotate} width="100" onClick={() => setTurned(prev => !prev)}></img>
                </div>
                <div className="flex flex-col bg-amber-50 p-2 rounded-lg">
                    <div className='text-amber-950 text-2xl pixel md:text-4xl m-4 flex flex-col'>
                        <p> NAME - {capitalize(poke.name)} </p> 
                    </div>
                    <div className='text-gray-950 pixel text-xl md:text-2xl m-4 flex gap-6 md:gap-30'>
                        <p> Height - {poke.height} </p>
                        <p> Weight - {poke.weight} </p>
                    </div>
                    <div className="flex gap-10 text-gray-950 pixel text-xl md:text-2xl m-4">
                        <p className="text-amber-950"> TYPE: </p>
                        {poke.types.map((t) => (
                            <p key={t.slot}>
                                {capitalize(t.type.name)}
                            </p>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-md max-w-md bg-green-200">
                            {poke.stats.map((stat) => (
                                <div className="m-2 bg-green-100">
                                    <div key={stat.stat.name} className="mb-4 text-amber-950 pixel ml-4">
                                        <span> {stat.stat.name.toUpperCase()}</span>
                                        <span> {stat.base_stat}</span>
                                    </div>

                                    <div className='w-full bg-gray-300 h-4 border border-black'>
                                        <div className={`${getBarColor(stat.base_stat)} h-4`}
                                            style={{ width: `${(stat.base_stat / 255)*100}% `}}
                                        >
                                        </div>
                                    </div>
                                </div> 
                            ))}
                        </div>
                    <div className="text-black ml-10 mt-4 text-xl pixel">
                        <p> SOUND: </p>

                    <button
                     className="h-20 text-white pixel"
                     onClick={playCry}
                     >CLICK </button>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    export default Pokemon;