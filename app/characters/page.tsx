/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client"

import getAllCharacters from '../../lib/getAllCharacters'

export default async function Characters() {
    // const characters = await getAllCharacters()

    const res = await fetch("http://localhost:8000/characters", { cache: 'no-store' });
    const characters = await res.json()

    console.log("characters", characters);

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            {characters?.map((character: any) => (
                <div key={character?.id} className="max-w-sm overflow-hidden rounded shadow-lg">
                    <img className="w-full" src={character?.image} alt={character.name} />
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold"> {character?.name} {character?.lastname}</div>
                        <div className="mb-2 text-xl font-bold"> {character?.age} ans</div>
                        <div>Pays de naissance : {character?.country}</div>
                        <div className="mb-2 text-xl font-bold">
                            âge : {character?.birth}
                        </div>
                        {character?.is_alive}
                    </div>
                </div>
            ))}
        </div>
    )
}
