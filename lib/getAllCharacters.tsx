export default async function getAllCharacters() {
    try {
        const res = await fetch("http://localhost:8000/characters", { cache: 'no-store' });

        if (!res.ok) {
            throw new Error("Failed to fetch data from API");
        }

        const data = await res.json();
        // les logs apparaissent dans le terminal et pas dans F12
        console.log("getAllCharacters", data);

        return data?.characters as any[];
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
}
