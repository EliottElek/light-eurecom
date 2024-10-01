import axios from "axios";

export const dynamic = 'force-dynamic'

export async function GET() {
    const { data } = await axios.get(`${process.env.REMOTE_API_ENPOINT}/simulations`); 
    return Response.json(data)
}