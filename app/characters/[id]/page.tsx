/* eslint-disable @next/next/no-async-client-component */
import { characterData } from '@/app/types/characterData';
import { useEffect, useState } from 'react';

interface CharacterDetail {
    data: characterData
}

async function getCharacter(id: number) {
    try {
        const res = await fetch(`http://localhost:8000/characters/${id}`);
        const data: CharacterDetail = await res.json();
        console.log("props détail", data);

        return data;
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
}

export default async function CharacterDetail({ params }: any) {
    const character = await getCharacter(params.id);

    return (
        <div className="grid justify-center mt-4">
            <div>Name: {character?.name}</div>
            <div>Age: {character?.age}</div>
        </div>
    );
}
