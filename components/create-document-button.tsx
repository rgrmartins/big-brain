'use client'

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UploadDocumentForm from "./upload-document-form"
import { useState } from "react"


const CreateDocumentButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} >
      <DialogTrigger asChild>
        <Button>
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over in the future.
          </DialogDescription>
        </DialogHeader>
        <UploadDocumentForm onUpload={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateDocumentButton