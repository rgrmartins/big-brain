'use client'

import UploadDocumentButton from '@/components/upload-document-button';
import DocumentCard from '@/components/document-card';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react'

export default function Home() {
  const documents = useQuery(api.documents.getDocuments)

  return (
    <main className="p-24 space-y-8">
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>My Documents</h1>
        <UploadDocumentButton />
      </div>

        <div className='grid grid-cols-4 gap-8'>
          {documents?.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
    </main>
  );
}
