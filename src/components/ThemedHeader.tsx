import Banner from './Banner'
import Header from './Header'

const ThemedHeader = () => {
  return (
    <div className="fixed z-50 w-full">
      <div className="relative left-0 top-0 flex h-28 w-full items-center justify-center border-b border-gray-300 bg-transparent dark:border-gray-700 dark:bg-black">
        <Banner />
        <Header />
      </div>
    </div>
  )
}

export default ThemedHeader
