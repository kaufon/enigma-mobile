export type ShareItemDto = {
  id: string;
  title: string; 
  expiresAt: string | null;
  deleteOnRead: boolean;
  createdAt: string;
  accessCount: number
  hash: string
};
