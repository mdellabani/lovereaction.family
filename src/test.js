import Parser from 'rss-parser'

const parser = new Parser()

export const fetchPodcastEpisodes = async (rssUrl) => {
  try {
    const feed = await parser.parseURL(rssUrl)

    console.log(`Feed Title: ${feed.title}`)
    console.log(`Feed Description: ${feed.description}`)
    console.log(`Total Episodes: ${feed.items.length}`)

    feed.items.forEach((item, index) => {
      console.log(`\n🔹 Episode ${index + 1}: ${item.title}`)
      console.log(item) // Logs all elements of the item
    })

    return feed.items.map((item) => ({
      title: item.title,
      audioUrl: item.enclosure?.url || 'No audio URL',
      description: item.content || item.description || 'No description',
      pubDate: item.pubDate || 'No date',
    }))
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return []
  }
}
;(async () => {
  await fetchPodcastEpisodes(
    'https://feeds.soundcloud.com/users/soundcloud:users:505440711/sounds.rss',
  )
})()
