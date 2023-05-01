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
    min?: number,
    max?: number,
    options?: string
}

export type IPayments = {
    id: string,
    userId: string,
    phoneNumber: string,
    date: string,
    amount: number
}

export interface DateTime {
    // Required fields
    readonly timestamp: number | undefined;
    // Optional additional members based on other types
}