// src/components/YouTubeEmbed.tsx

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps) => {
  return (
    // This container maintains a 16:9 aspect ratio for responsiveness
    <div className="relative w-full pb-[56.25%]"> 
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;