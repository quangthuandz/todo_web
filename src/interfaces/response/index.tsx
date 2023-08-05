export enum STATUS {
    NEW = 'NEW',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
}
export interface ITodo {
    id: number
    status: STATUS
    title: string
    body: string
    isDeleted?: boolean
    dueDate?: Date
    createdAt?: Date
}

export  interface User{
    id: number
    username: string
    password: string
    name: string
}