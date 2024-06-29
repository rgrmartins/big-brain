import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

const DocumentPage = ({
  params
} : {
  params: {
    documentId: string
  }
}) => {
    console.log('🚀 ~ documentId >>>>>>', params.documentId)
  const documents = useQuery(api.documents.getDocuments)

  return (
    <div className="py-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Document Page</h1>
      </div>
    </div>
  )
}

export default DocumentPage