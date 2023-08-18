import CharactersList from "./charactersList";

export default function Characters() {
    return (
        <main>
            <div className="container mx-auto justify-center text-center mt-2 shadow-md p-4 bg-white">
                <h2>Les Personnages</h2>
                <p className="text-sm text-gray-500">La liste des personnages de la série Walking Dead</p>

                <CharactersList />
            </div>
        </main>
    );
}
