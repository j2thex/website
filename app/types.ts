export interface User {
    status?: string;
    isPhoneVerified?: boolean;
    phoneNumber?: string;
    address?: string;
    email?: string;
    otp?: string;
}

export interface CountryFlag {
    id: number;
    phone_code: string;
    short_name: string;
    full_name: string;
    flag_href: string;
}

export interface Reward {
    address: string;
    dailyReceivedAt: Date;
    streakCount: number;
}
