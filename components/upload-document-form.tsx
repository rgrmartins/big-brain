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
  file: z.instanceof(File),
})

const UploadDocumentForm = (
  { onUpload }: { onUpload: () => void }
) => {
  const createDocument = useMutation(api.documents.createDocument)
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = await generateUploadUrl()
    console.log('🚀 ~ url >>>>>>', url)
    const { title, file } = values
    console.log('🚀 ~ file >>>>>>', file.type)

    // Send post to storage (Convex)
    const result = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": file.type },
      body: file,
    })

    const { storageId } = await result.json()

    await createDocument({ title, fileId: storageId })
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
        <FormField
          control={form.control}
          name="file"
          render={({ field : { value, onChange, ...fieldProps }}) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  { ...fieldProps }
                  type='file'
                  accept='.txt,.xml,.doc'
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    onChange(file)
                  }}
                />
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