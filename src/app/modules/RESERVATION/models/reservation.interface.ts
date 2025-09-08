export interface Reservation {
    id: string;
    customerId: string;
    startDate: string;
    endDate: string;
    state:string;
    pricePerDay: number;
    totalPrice: number;
    maintenanceCostPerDay: number;
    totalCost: number;
    discountPercentage: number;
    roomId: string;
}

export interface NewReservation {
    startDate: Date;
    endDate: Date;
    customerId: string;
    roomId: string;
}