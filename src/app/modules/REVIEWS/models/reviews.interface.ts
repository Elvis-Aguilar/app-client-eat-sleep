export interface NewReview {
    customerId: string;
    refenceId: string;
    rating: number;
    comment: string;
    typeReference: 'hotel' | 'restaurant' | 'dishes' | 'room';
}

export interface ReviewHotel {
    id: string;
    customerId: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}