import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, res: any) {
    
    const { nb_receivers, nb_routers } = await request.json();
    const { data } = await axios.post(`${process.env.REMOTE_API_ENPOINT}/create_simulation`, {
        nb_receivers: nb_receivers,
        nb_routers: nb_routers
    })

    return NextResponse.json(data, { status: 200 });
}
