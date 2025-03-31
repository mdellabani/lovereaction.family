'use client'
import { releases } from '@/components/data'
import PreviewList from '@/components/PreviewList'
import { usePlayer } from '@/context/PlayerContext'

const Home = () => {
  const { getAllTracks, loading } = usePlayer()

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <PreviewList
        items={() => releases}
        loading={false}
        route="/label"
        title="Releases"
      />

      <PreviewList
        items={() => getAllTracks()}
        loading={loading}
        route="/podcasts"
        title="Podcasts"
      />
    </div>
  )
}

export default Home
