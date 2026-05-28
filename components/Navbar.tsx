type NavbarProps = {
    title: string;
};

export default function Navbar({
    title,
}: NavbarProps) {
    return (
        <nav>
            <h1>{title}</h1>
        </nav>
    );
}