import CharactersList from "./charactersList";
import MainLayout from '../components/Main';

export default function Characters() {
    return (
        <MainLayout>
            <div className="">
                <h2>Les Personnages</h2>
                <p className="text-sm text-gray-500">La liste des personnages de la série Walking Dead</p>

                <CharactersList />
            </div>
        </MainLayout>
    );
}
