import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type PlayContextType = {
  player: AudioPlayer;
  book: any;
  setBook: (book: any) => void;
};

const PlayContext = createContext<PlayContextType | null>(null);

export default function PlayProvider({ children }: PropsWithChildren) {
  const [book, setBook] = useState<any | null>(null);
  const player = useAudioPlayer({ uri: book?.audio_url });

  return <PlayContext.Provider value={{ player, book, setBook }}>{children}</PlayContext.Provider>;
}

export function usePlay() {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlay must be used within a PlayProvider");
  }
  return context;
}
