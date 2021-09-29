export interface HackIdea {
    id?: string;
    title: string;
    description: string;
    tags: string[];
    upvotes?: number;
    createdAt?: string | Date;
    userId?: string;
    upvotedBy?: string[];
}