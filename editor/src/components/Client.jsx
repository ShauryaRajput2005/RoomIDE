import Avatar from 'react-avatar'

function Client({ id, name }) {
  return (
    <div className="relative group flex justify-center z-50">
      <Avatar
        name={name}
        size="32"
        round="full"
        textSizeRatio={2}
        className="shadow-md rounded-full cursor-pointer transition-transform duration-200 group-hover:scale-110 sm:size-[36px] md:size-[40px]"
      />
      <span className="text-[#49de6f] absolute bottom-[-28px] left-1/2 -translate-x-1/2 bg-gray-800 text-gray-100 text-[10px] sm:text-[11px] md:text-xs px-2 py-[2px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[9999]">
        {name}
      </span>
    </div>
  )
}

export default Client
