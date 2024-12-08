export interface Trip {
    _id?: string; // Internal primary key in MongoDB (optional during creation)
    code: string; // Unique trip code
    name: string; // Name of the trip
    length: number; // Duration of the trip in days
    start: Date; // Start date of the trip
    resort: string; // Resort location
    perPerson: number; // Price per person
    image: string; // Image URL or file name
    description: string; // Description of the trip
}
