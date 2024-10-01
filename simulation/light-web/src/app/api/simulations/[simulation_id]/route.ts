import axios from "axios";

export const dynamic = 'force-dynamic'

export async function GET(
    request: Request,
    { params }: { params: { simulation_id: string } }) {
    const { data } = await axios.get(`${process.env.REMOTE_API_ENPOINT}/simulations/${params.simulation_id}`);
    return Response.json(data)
}