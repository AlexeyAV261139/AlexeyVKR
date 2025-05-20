import React, { useEffect, useState } from "react";
import StreamCodeSetter from "./StreamCodeSetter";
import { useAppContext } from "../Context/AppContext";

interface YouTubePlayerProps {
  videoId?: string;
  title: string;
  description?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  description,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { streamCode } = useAppContext();

  if (!videoId)
    videoId=streamCode!

  // Таймер: если видео не загрузилось за 5 секунд — ошибка
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoaded]);

  return (
    <>
      <StreamCodeSetter />

      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>

        <div className="relative rounded-lg overflow-hidden aspect-video mb-4 bg-gray-100">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse z-10">
              <span className="text-gray-500">Загрузка видео...</span>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-red-600 text-center px-4">
              <p className="text-md font-medium">
                Трансляция недоступна или произошла ошибка загрузки.
              </p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
              onLoad={() => setIsLoaded(true)}
              className="w-full h-full absolute inset-0"
            />
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-600 text-center">{description}</p>
        )}
      </div>
    </>
  );
};

export default YouTubePlayer;
