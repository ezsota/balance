export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="font-gray ps-2 text-center">
            <p className="h-100 m-0">BALANCE &copy; {year}</p>
        </footer>
    )
};