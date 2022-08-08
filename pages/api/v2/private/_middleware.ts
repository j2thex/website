import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.cookies['sb-access-token']) {
        return NextResponse.next();
    } else {
        return new Response('Unauthorized');
    }
}
