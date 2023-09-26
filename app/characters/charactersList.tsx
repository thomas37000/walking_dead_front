/* eslint-disable @next/next/no-img-element */

import getAllCharacters from '../../lib/getAllCharacters';
import { characterData } from '../types/characterData';
import Link from 'next/link';
import Placeholder from "../assets/placeholder.png"

interface AllCharacters {
    data: characterData
}

async function fetchAllCharacters() {
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        const res = await fetch("http://localhost:8000/characters", {
            next: {
                revalidate: 60
            }
        });

        return await res.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

export default async function CharactersList() {
    const characters = await fetchAllCharacters();

    return (
        <div className="grid grid-cols-4 gap-4 mt-4 p-2">
            {characters?.map((character: any) => (
                <div key={character?.id} className="max-w-sm overflow-hidden rounded shadow-lg bg-white">
                    {character?.image ? <img className="w-full" src={character?.image} alt={character?.name} /> : <img className="w-full" src={Placeholder.src} alt={character?.name} />}
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold"> {character?.name} {character?.lastname}</div>
                        <Link href={`/characters/${character?.id}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                Infos
                            </button>

                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
