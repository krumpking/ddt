export type IUser = {
    id: string,
    adminId: string,
    date: string,
    name: string,
    contact: string,
    role: string,
}


export type IClient = {
    id: any,
    adminId: any,
    date: any,
    name: string,
    contact: string,
    organisation: string,
    stage: string,
    notes: string[],
    refSource: string,
    enquired: string[],
    value: string
}



