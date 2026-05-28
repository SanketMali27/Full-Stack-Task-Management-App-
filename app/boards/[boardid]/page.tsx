export default function BoardPage({ params }: { params: { boardid: number } }) {
    return <h1>Single Board Page {params.boardid} </h1>;
}