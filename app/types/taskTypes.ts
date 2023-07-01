import { IClient } from "./userTypes"

export type ITask = {
    title: string,
    email: string,
    priority: string,
    reminder: string,
    description: string,
    encryption: number,
    date: string,
    client: IClient

}