export default function TrailerModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      
      <div className="bg-black p-4 rounded-xl w-[90%] md:w-[60%]">
        
        <button
          className="text-white mb-2"
          onClick={onClose}
        >
          Close
        </button>

        <iframe
          className="w-full h-[400px]"
          src={`https://www.youtube.com/embed/${video.key}`}
          allowFullScreen
        />
      </div>

    </div>
  );
}