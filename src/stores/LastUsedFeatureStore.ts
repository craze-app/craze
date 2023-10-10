import create from 'zustand'
import { persist } from 'zustand/middleware'

type LastUsedFeatureState = {
  lastUsedFeatureId: string
  updateLastUsedFeature: (featureId: string) => void
}

const DEFAULT_FEATURE_ID = 'json-formatter'

export const useLastUsedFeatureStore = create(
  persist<LastUsedFeatureState>(
    (set, get) => ({
      lastUsedFeatureId: DEFAULT_FEATURE_ID,
      updateLastUsedFeature: (featureId: string) => {
        set({ lastUsedFeatureId: featureId })
      },
    }),
    {
      name: 'favourite-features-storage',
    },
  ),
)
