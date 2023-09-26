"use client"

import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react";

interface CharacterFormState {
    name: string;
    lastname: string;
    age: number;
    country: string;
    image: string;
    isAlive: boolean;
    isLoading: boolean;
    charactersList: Array<[]>;
}

export default function CharacterForm() {
    const router = useRouter()


    // const [name, setName] = useState('')
    // const [lastname, setLastName] = useState('')
    // const [age, setAge] = useState(0)
    // const [characterList, setCharacterList] = useState(0)
    // const [country, setCountry] = useState('')
    // const [image, setImage] = useState('')
    // const [is_alive, setIsAlive] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<CharacterFormState>({
        name: '',
        lastname: '',
        age: 0,
        country: '',
        image: '',
        isAlive: false,
        isLoading: false,
        charactersList: [],
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const newTicket = { name, lastname, age, country, is_alive, image }

        const res = await fetch("http://localhost:8000/characters/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTicket)
        })

        if (res.status === 201) {
            router.refresh()
            router.push('/characters')
        }

    }

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setFormData((prevData) => ({ ...prevData, isLoading: true }));

    //     const newCharacter = { ...formData };

    //     const res = await fetch("http://localhost:8000/characters/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newCharacter),
    //     });

    //     if (res.status === 201) {
    //         router.refresh();
    //         router.push('/characters');
    //     }
    // };

    return (


        <form onSubmit={handleSubmit} className="w-full max-w-lg" encType="multipart/form-data">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                        Prénom
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text" placeholder="I'm" onChange={handleInputChange} defaultValue={formData.name} />
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lastname">
                        Nom
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-lastname" type="text" placeholder="Negan" onChange={handleInputChange} defaultValue={formData.lastname} />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 my-10">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                        Pays
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="USA" onChange={handleInputChange} defaultValue={formData.country} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        en vie ?
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleInputChange} defaultValue={formData.isAlive.toString()}>
                            <option>Alive</option>
                            <option>Dead</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label htmlFor="charactersList">
                        Characters List:
                        <select
                            id="charactersList"
                            name="charactersList"
                            defaultValue={formData.charactersList}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a Characters List</option>
                            {charactersList.map(list => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
             */}
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Image
                    </label>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                            <input className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file" onChange={handleFileChange} />

                        </label>
                    </div>
                </div>
            </div>

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
