export type EventCategory = "Hamfest" | "Meeting" | "Training" | "Other";

export interface GMRSEvent {
    id: string;
    title: string;
    category: EventCategory;
    date: string;
    location: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    description: string;
    isFeatured?: boolean;
}
