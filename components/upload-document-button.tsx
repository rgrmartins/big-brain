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
import { Upload } from "lucide-react"


const UploadDocumentButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
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

export default UploadDocumentButton