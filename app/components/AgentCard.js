import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AgentCard = ({ name, description, cta, imagePath, route, buttonClass }) => {
  const router = useRouter()

  return (
    <div 
      onClick={() => router.push(route)}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">{description}</p>
        <div className="flex justify-center">
          <button 
            className={`inline-block text-white py-3 px-6 rounded-lg font-medium transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap ${buttonClass}`}
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentCard 