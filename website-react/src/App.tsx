import { useState } from 'react'
import './style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rugplay - React + Vite
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the React version of Rugplay!
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            count is {count}
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>✅ React + Vite setup</li>
            <li>✅ TypeScript configured</li>
            <li>✅ Tailwind CSS configured</li>
            <li>✅ Database schema copied</li>
            <li>⏳ Authentication setup (in progress)</li>
            <li>⏳ Components migration (pending)</li>
            <li>⏳ API routes (pending)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

