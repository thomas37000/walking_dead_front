import CharactersList from "./charactersList";

export default function Characters() {
    return (
        <main>
            <div>
                <h2>Les Personnages</h2>
                <p><small>La liste des personnages de la série Walking Dead</small></p>
            </div>
            <CharactersList />
        </main>
    );
}
