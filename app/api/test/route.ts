export async function GET() {
    return Response.json({
        message: "GET request",
    });
}
export async function POST(request: Request) {
    const body = await request.json();

    return Response.json({
        receivedData: body,
    });
}