import { BookmarkType, PostType } from "./posts.types"

export type UserType = {
  email: string
  firstName: string
  lastName: string
  username: string
}

export type UserAccountType = UserType & {
  confirmPassword: string
  password: string
}

export type UserProfileType = UserType & {
  bookmarks: BookmarkType[]
  posts: PostType[]
}
