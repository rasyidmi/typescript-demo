export type JwtPayload = {
    username: string
    role: number
}

export type JwtResponse = {
    username: string
    role: number
    iat: number
    exp: number
}