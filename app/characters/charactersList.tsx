/* eslint-disable @next/next/no-img-element */

import getAllCharacters from '../../lib/getAllCharacters';
import { characterData } from '../types/characterData';
import Link from 'next/link';

interface AllCharacters {
    data: characterData
}

async function fetchAllCharacters() {
    try {
        const res = await fetch("http://localhost:8000/characters", { cache: 'no-store' });

        return await res.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

export default async function CharactersList() {
    const characters = await fetchAllCharacters();

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
                        <Link href={`/characters/${character?.id}`}>
                            <button>
                                infos
                            </button>
                        </Link>

                    </div>
                </div>

            ))}
        </div>
    );
}
