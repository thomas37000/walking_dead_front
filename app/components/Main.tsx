export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="md:container md:mx-auto justify-center text-center mt-2 shadow-md p-24 bg-white">
            {children}
        </main>
    );
}