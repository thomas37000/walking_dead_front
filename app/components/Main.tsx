export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className=" justify-center text-center mt-2 shadow-md p-24 bg-white banner md:mx-auto">
            {children}
        </main>
    );
}