import jwt from 'jsonwebtoken';

export function getUserFromCookies(cookies: any): any {
    const token = cookies['sb-access-token'];
    const jwtData = jwt.verify(token, process.env.JWT_SECRET || '');
    return jwtData;
}
