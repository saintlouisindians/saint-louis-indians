export class Business {
    id: number;
    name: number;
    description: number;
    address: Address;
    email: string;
    phone: string;
    webLink: string;
    subCategoryID: number;
}

export class Address {
    address1: string;
    address2: string;
    state: string;
    city: string;
    zipCode: number;
}