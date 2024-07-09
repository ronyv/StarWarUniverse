import People from "./People";

export default interface PeopleResponse {
    count: string;
    next?: string;
    previous?: string; 
    results: People[];
}