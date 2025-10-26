import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Welcome to Rugplay
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          The ultimate cryptocurrency trading simulation platform
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/market" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market</h3>
              <p className="text-gray-600">Explore all available coins and start trading</p>
            </div>
          </Link>

          <Link to="/portfolio" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio</h3>
              <p className="text-gray-600">View your holdings and track your performance</p>
            </div>
          </Link>

          <Link to="/leaderboard" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leaderboard</h3>
              <p className="text-gray-600">See who's on top and compete with others</p>
            </div>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="bg-white rounded-lg shadow-md p-6 text-left max-w-2xl mx-auto">
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Start with $100 in base currency</li>
              <li>Explore the market and find coins you want to trade</li>
              <li>Buy and sell coins to build your portfolio</li>
              <li>Track your performance on the leaderboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

