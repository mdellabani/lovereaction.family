import Header from './Header'

const ThemedHeader = () => {
  return (
    <div className="fixed z-50 w-full">
      <div className="relative h-12 w-full overflow-hidden border-b border-gray-300 dark:border-gray-700">
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

        {/* Banner images + nav in a flex row, centered */}
        <div className="relative z-10 flex h-full items-center justify-center">
          {/* Left banner: logo ends up ~130px left of nav */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="hidden h-full shrink-0 sm:block"
            src="/banner.png"
          />
          {/* Nav floats between the two banners */}
          <Header />
          {/* Right banner: logo ends up ~130px right of nav */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="hidden h-full shrink-0 sm:block"
            src="/banner.png"
          />
        </div>
      </div>
    </div>
  )
}

export default ThemedHeader
