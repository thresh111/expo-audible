import { AudioPlayer, AudioStatus, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type PlayContextType = {
  player: AudioPlayer;
  book: any;
  setBook: (book: any) => void;
  playStatus: AudioStatus;
};

const PlayContext = createContext<PlayContextType | null>(null);

export default function PlayProvider({ children }: PropsWithChildren) {
  const [book, setBook] = useState<any | null>(null);
  const player = useAudioPlayer({ uri: book?.audio_url });
  const playStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    if (book?.audio_url) {
      player.play();
    }
  }, [book?.audio_url]);

  return <PlayContext.Provider value={{ player, book, setBook, playStatus }}>{children}</PlayContext.Provider>;
}

export function usePlay() {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlay must be used within a PlayProvider");
  }
  return context;
}
