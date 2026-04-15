import Header from './Header'

const ThemedHeader = () => {
  return (
    <div className="fixed z-50 w-full">
      {/* Banner strip: zigzag fills left/right, single banner centered */}
      <div className="relative h-24 w-full overflow-hidden border-b border-gray-200 sm:h-32">
        {/* Zigzag fill — left side */}
        <div
          className="absolute inset-y-0 left-0 right-1/2"
          style={{
            backgroundImage: "url('/zigzag-left.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'left center',
          }}
        />
        {/* Zigzag fill — right side */}
        <div
          className="absolute inset-y-0 left-1/2 right-0"
          style={{
            backgroundImage: "url('/zigzag-right.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right center',
          }}
        />
        {/* Centered banner image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="h-full" src="/banner.png" />
        </div>
      </div>

      {/* Navigation bar below */}
      <div className="w-full border-b border-gray-200 bg-gradient-to-r from-purple-400/60 via-red-300/50 to-green-300/60 backdrop-blur-md">
        <Header />
      </div>
    </div>
  )
}

export default ThemedHeader
