export interface HackIdea {
    title: string;
    description: string;
    tags: string[];
    upvotes: number;
    createdAt: string | Date;
    userId: string;
}