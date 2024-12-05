import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]

export const PostAuctionSchema = z.object({
  item_name: z.string().min(5, {
    message: 'Item name is required and must be at least 5 characters long.',
  }),
  starting_price: z.coerce
    .number()
    .positive({ message: 'Starting price must be a positive number.' }),
  auction_img: z
    .instanceof(File, { message: 'please upload a file' })
    .refine((file) => !!file, 'File is required.')
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'File size must be less than 5MB.',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only JPEG, PNG, GIF, and WEBP formats are supported.',
    }),
  expiry_time: z.date().refine((date) => date >= new Date(), {
    message: 'Date must be today or in the future.',
  }),
})

export type PostAuctionSchemaType = z.infer<typeof PostAuctionSchema>
