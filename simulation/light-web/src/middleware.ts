import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const checkServerStatus = async () => {
    try {
        const { data } = await axios.get(`${process.env.DOCKER_NEXT_HOST}/api/health`);
        console.log(data)
        return data.ok
    } catch (error) {
        console.log(error)
        return false
    }
};
export async function middleware(request: NextRequest) {
    if (await checkServerStatus() == false) {
        return NextResponse.redirect(new URL('/demo', request.url))
    }
}
export const config = {
    matcher: '/playground',
}