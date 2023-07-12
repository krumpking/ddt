



export type IBookingEvent = {
    adminId: any,
    id: any,
    created: any,
    title: any,
    date: any,
    dateString: any,
    description: any,
    time: any,
    venue: any,
    directions: any,
    encryption: number,
    bookings: IAttendee[]

}


export type IAttendee = {
    eventId: any,
    name: any,
    phone: any,
    email: any

}