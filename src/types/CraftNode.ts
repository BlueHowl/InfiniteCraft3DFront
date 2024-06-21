export type CraftNode = { 
    id: string;
    text: string;
    emoji: string;
    tags?: string;
    previewUrl?: string;
    modelUrl?: string;
    isNew: boolean;
    createdAt: number;
};