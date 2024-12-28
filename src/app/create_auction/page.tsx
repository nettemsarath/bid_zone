'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

import { PostAuctionSchema, PostAuctionSchemaType } from '@/types/auctionTypes'
import { useServerActionMutation } from '@/lib/hooks/server-actio-hooks'
import { createAuctionAction } from './_actions/create_auction'
import { toast } from 'sonner'
import { Label } from '@radix-ui/react-label'
import { useSession } from 'next-auth/react'

function page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  // const { data: userSession, status } = useSession()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PostAuctionSchemaType>({
    resolver: zodResolver(PostAuctionSchema),
  })

  const {
    data,
    mutateAsync: createAuctionMutate,
    isPending,
    error,
  } = useServerActionMutation(createAuctionAction, {
    onError: (error) => {
      toast.error('Failed to Create Auction')
    },
    onSuccess: (data) => {
      toast.success(`${data.message}`)
    },
  })

  const onSubmit = async (data: PostAuctionSchemaType) => {
    await createAuctionMutate(data)
  }
  return (
    <div className="container mx-auto p-12 px-8">
      <Card className="max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Post an Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="py-6"
                  {...register('auction_name')}
                  placeholder="Item Name"
                />
                {errors.auction_name && (
                  <span className="text-red-500">
                    {errors.auction_name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  className="py-6"
                  type="number"
                  {...register('starting_price')}
                  placeholder="Starting Price"
                />
                {errors.starting_price && (
                  <span className="text-red-500">
                    {errors.starting_price.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm">Select Auction Image</Label>
                <Controller
                  control={control}
                  name={'auction_img'}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <Input
                        {...field}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const files = event.target.files
                          if (files && files.length > 0) {
                            onChange(files[0])
                          }
                        }}
                        type="file"
                      />
                    )
                  }}
                />
                {errors.auction_img && (
                  <span className="text-red-500">
                    {errors.auction_img.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm">Auction Expiry Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={`w-[280px] justify-start text-left font-normal ${
                        !date ? 'text-muted-foreground' : ''
                      }`}
                    >
                      <CalendarIcon />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Controller
                      control={control}
                      name="expiry_time"
                      render={({ field }) => (
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date)
                            field.onChange(date)
                          }}
                        />
                      )}
                    />
                  </PopoverContent>
                </Popover>
                {errors.expiry_time && (
                  <span className="text-red-500">
                    {errors.expiry_time.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="text-base px-4 py-6">
              Post Item
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default page
