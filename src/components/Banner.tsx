import React from 'react'

const Banner = () => {
  return (
    <div className="absolute left-0 right-0 top-0 h-28 w-full">
      <div className="absolute left-0 top-0 h-full w-1/2 2xl:w-1/4">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundPosition: '-100px center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      <div className="absolute left-1/2 top-0 h-full w-1/2 2xl:left-1/4 2xl:w-1/4">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundPosition: '0px center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      <div className="absolute right-1/4 top-0 hidden h-full w-1/4 2xl:block">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundPosition: '100px center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      <div className="absolute right-0 top-0 hidden h-full w-1/4 2xl:block">
        <div
          className="h-full w-full bg-cover"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundPosition: '100px center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    </div>
  )
}

export default Banner
