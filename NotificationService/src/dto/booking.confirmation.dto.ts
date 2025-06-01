export interface BookingConfirmationDto {
    guest_name: string;
    listing_title: string;
    host_name: string;
    check_in_date: string;
    check_out_date: string;
    nights: number;
    guest_count: number;
    listing_address: string;
    total_price: number;
};