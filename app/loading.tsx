import MainLayout from "./components/Main";

export default function Loading() {
    return (
        <MainLayout>
            <span className="loading loading-spinner loading-lg text-warning"></span>
        </MainLayout>

    );
}
