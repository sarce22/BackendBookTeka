export interface User{
    name: string
    lastname: string
    id: number
    email: string
    password: string
    role: string
    favorites?: string[]
}