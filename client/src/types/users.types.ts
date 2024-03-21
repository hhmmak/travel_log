import { BookmarkType, PostType } from "./posts.types"

export type UserType = {
  bookmarks: BookmarkType[]
  email: string
  firstName: string
  lastName: string
  posts: PostType[]
  username: string
}
