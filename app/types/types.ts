export type IAdmin = {
    id?: string,
    name: string,
    phoneNumber: string,
    createdDate: string,
    email: string,
    organizationName: string,
}

export type IForm = {
    id?: string,
    title: string,
    description: string,
    elements: IFormElement[],
    dateCreated: string,
    creatorId: string,
    editorNumbers: string[]
}

export type IFormElement = {
    id: string,
    elementId: number,
    label: string,
    arg1: any,
    arg2: any,
    arg3: any
}

export type IPayments = {
    id: string,
    userId: string,
    phoneNumber: string,
    date: string,
    amount: number,
    refCode: string
}

export type IData = {
    id: string,
    title: string,
    descr: string,
    date: string,
    editorId: string,
    encryption: number,
    info: any[],
    infoId: string
}


export interface DateTime {
    // Required fields
    readonly timestamp: number | undefined;
    // Optional additional members based on other types
}