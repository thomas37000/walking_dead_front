import MainLayout from "@/app/components/Main";
import CharacterForm from "./CharacterForm";


export default async function NewCharacter() {
    return (
        <MainLayout>
            <div className="bg-white p-10">
                <h2 className="mb-8">Ajoutez un nouveau personnage</h2>
                <CharacterForm />
            </div>
        </MainLayout>
    )
}