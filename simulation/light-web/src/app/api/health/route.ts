import axios from "axios";

export const dynamic = 'force-dynamic'

export async function GET() {
    const { data } = await axios.get(`${process.env.REMOTE_API_ENPOINT}/health`);  // Flask health endpoint
    return Response.json({ ok: data.status === "ok" ? true : false })
}