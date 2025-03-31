import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PreviewItem } from '@/types/audio'
import { Spinner } from '@heroui/spinner'

type PreviewListProps<T extends PreviewItem> = {
  title: string
  items: () => T[]
  route: string
  loading: boolean
}

const PreviewList = <T extends PreviewItem>({
  title,
  items,
  route,
  loading,
}: PreviewListProps<T>) => {
  const resolvedItems = items()

  return (
    <div className="relative m-10 w-2/3 border-b-4 border-l-4 border-gray-300 p-4 before:absolute before:left-0 before:top-0 before:w-1/4 before:border-t-4 before:border-gray-300">
      <h2 className="mb-4 pl-2 text-xl font-bold">{title}</h2>
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <Spinner color="danger" labelColor="danger" />
        </div>
      ) : (
        <div className="flex gap-4">
          {resolvedItems.slice(0, 4).map((item, index) => (
            <div
              className="w-48 rounded-lg border p-4 text-center shadow-md"
              key={index}
            >
              <Image
                alt={item.title}
                className="h-40 w-40 rounded-lg object-cover"
                height={200}
                src={item.imageUrl}
                width={200}
              />
              <p className="mt-2 text-sm text-gray-500">[{item.type}]</p>
              <p className="font-bold">{item.title}</p>
              {item.artist && (
                <p className="text-sm text-gray-600">{item.artist}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {resolvedItems.length > 2 && (
        <div className="mt-4 text-center">
          <Link className="text-blue-500 hover:underline" href={route}>
            See More
          </Link>
        </div>
      )}
    </div>
  )
}

export default PreviewList
