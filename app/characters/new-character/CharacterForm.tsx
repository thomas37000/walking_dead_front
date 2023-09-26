"use client"

import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react";

interface CharacterFormState {
    name: string;
    lastname: string;
    age: number;
    country: string;
    image: string | null;
    is_alive: boolean;
    isLoading: boolean;
    charactersList: number | null;
}

export default function CharacterForm() {
    const router = useRouter()

    const [formData, setFormData] = useState<CharacterFormState>({
        name: '',
        lastname: '',
        age: 0,
        country: '',
        image: null,
        is_alive: false,
        isLoading: false,
        charactersList: null,
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "charactersList") {
            const characterList = value.split(',').map(item => item.trim());
            setFormData((prevData) => ({
                ...prevData,
                characterList,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }


        console.log("handleInputChange", name);
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageBase64 = event.target?.result as string;
                setFormData((prevData) => ({
                    ...prevData,
                    image: imageBase64,
                }));
            };

            reader.readAsDataURL(file); // Read the selected file as data URL
        }
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData((prevData) => ({ ...prevData, isLoading: true }));

        const newCharacter = { ...formData };

        console.log("handleSubmit => newCharacter", newCharacter);

        const res = await fetch("http://localhost:8000/characters/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newCharacter),
        });

        if (res.status === 201) {
            router.refresh();
            router.push('/characters');
        }
    };


    return (

        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                        Prénom
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text" name="name" placeholder="I'm" onChange={handleInputChange} value={formData.name} />
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lastname">
                        Nom
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-lastname" type="text" name="lastname" placeholder="Negan" onChange={handleInputChange} value={formData.lastname} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 my-10">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                        Pays
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="country" type="text" name="country" placeholder="USA" onChange={handleInputChange} value={formData.country} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        en vie ?
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleInputChange} value={formData.is_alive.toString()}>
                            <option>Alive</option>
                            <option>Dead</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="charactersList">
                        Character List
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="charactersList"
                        type="number"
                        name="charactersList"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-image">
                        Image
                    </label>

                    <input
                        className='form-control'
                        type='file'
                        name='image'
                        onChange={handleFileChange}
                    />
                </div>
            </div> */}

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={formData.isLoading}
            >
                {formData.isLoading ? <span>Adding...</span> : <span>Add Character</span>}
            </button>
        </form >
    );
}
