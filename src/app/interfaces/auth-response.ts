export interface AuthResponse {
    user: {
        id: number,
        name: string,
        username: string,
        email: string,
        password: string
        token: string,
        expires_in: number
    }
}