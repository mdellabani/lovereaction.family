import Header from './Header'

const ThemedHeader = () => {
  return (
    <div className="fixed z-50 w-full">
      <div className="relative h-16 w-full overflow-hidden border-b border-gray-300 dark:border-gray-700">
        {/* Zigzag fills behind everything */}
        <div
          className="absolute inset-y-0 left-0 hidden w-1/2 sm:block"
          style={{
            backgroundImage: "url('/zigzag-left.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 sm:block"
          style={{
            backgroundImage: "url('/zigzag-right.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right center',
          }}
        />

        {/* Mobile: centered banner, zigzag fills left and right */}
        <div className="relative z-10 flex h-full w-full items-center justify-center sm:hidden">
          <div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              backgroundImage: "url('/zigzag-left.png')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              backgroundImage: "url('/zigzag-right.png')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'right center',
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="relative z-10 h-full" src="/banner.png" />
          <div className="absolute inset-0 z-20">
            <Header />
          </div>
        </div>

        {/* Desktop: banner + nav + banner with gradient */}
        <div className="relative z-10 mx-auto hidden h-full w-fit items-center justify-center bg-gradient-to-r from-purple-400/60 via-red-300/50 via-yellow-200/50 to-green-300/60 backdrop-blur-md sm:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="h-full shrink-0" src="/banner.png" />
          <Header />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="h-full shrink-0" src="/banner.png" />
        </div>
      </div>
    </div>
  )
}

export default ThemedHeader
