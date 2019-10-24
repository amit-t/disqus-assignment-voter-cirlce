export interface Comment {
  id: string;
  author: string;
  avatar: string;
  datetime: number;
  commentText: string;
  likes: number;
  dislikes: number;
  replies: [];
}
