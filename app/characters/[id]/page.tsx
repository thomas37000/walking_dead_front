/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
import { characterData } from '@/app/types/characterData';
import Placeholder from "../../assets/placeholder.png"
import MainLayout from '@/app/components/Main';

async function getCharacter(id: number) {

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        const res = await fetch(`http://localhost:8000/characters/${id}`, {
            next: {
                revalidate: 60
            }
        });
        const data: characterData = await res.json();
        console.log("props détail", data);

        return data;
    } catch (error) {
        console.error("Error fetching character data:", error);
    }
}

export default async function CharacterDetail({ params }: any) {
    const character = await getCharacter(params.id);

    return (
        <MainLayout>
            <div className="flex justify-center text-center">
                <div key={character?.id} className="max-w-sm overflow-hidden rounded shadow-lg bg-white">
                    {character?.image ? <img className="w-full" src={character?.image} alt={character?.name} /> : <img className="w-full" src={Placeholder.src} alt={character?.name} />}
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold"> {character?.name} {character?.lastname}</div>
                        <div className="mb-2 text-xl font-bold"> {character?.age} ans</div>
                        <div>Pays de naissance : {character?.country}</div>
                        <div> {character?.is_alive}</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
