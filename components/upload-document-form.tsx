'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  title: z.string().min(2).max(250),
})

const UploadDocumentForm = (
  { onUpload }: { onUpload: () => void }
) => {
  const createDocument = useMutation(api.documents.createDocument)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values
    await createDocument({ title })
    onUpload()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Type a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='flex gap-2 items-center'
          type="submit"
          disabled={ form.formState.isSubmitting }
        >
          {form.formState.isSubmitting && (
            <Loader2 className="animate-spin" />
          )}
          { form.formState.isSubmitting ? 'Uploading...' : 'Upload' }
          </Button>
      </form>
    </Form>
  )
}

export default UploadDocumentForm