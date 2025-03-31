'use client'
import { releases } from '@/components/data'
import PreviewList from '@/components/PreviewList'
import { usePlayer } from '@/context/PlayerContext'
const Home = () => {
  console.log(usePlayer)

  const { getAllTracks } = usePlayer()
  return (
    <div className="m-20">
      <PreviewList items={releases} seeMoreLink="/label" title="Releases" />
      <PreviewList
        items={getAllTracks()}
        seeMoreLink="/podcasts"
        title="Podcasts"
      />
    </div>
  )
}

export default Home
