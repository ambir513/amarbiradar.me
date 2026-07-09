import { uMiniMapOpenSound } from "@/lib/soundcn/click-soft"

import { useSound } from "./use-sound"

export function useClickSound() {
    return useSound(uMiniMapOpenSound, { volume: 0.3 })
}