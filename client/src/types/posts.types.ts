export type PostType = {
  destination: string
  city: string
  content: string
  country: string
  createdAt: string
  dateFrom: string
  dateTo: string
  duration: number
  id: number
  itinerary: string
  location: string
  title: string
  userId: number
  username: string
}

export type PostFormType = Pick<PostType,
  "city" |
  "content" |
  "country" |
  "dateFrom" |
  "dateTo" |
  "itinerary" |
  "location" |
  "title"
>

export type BookmarkType = Pick<PostType,
  "destination" |
  "duration" |
  "id" |
  "title"
>
