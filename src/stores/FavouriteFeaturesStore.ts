import create from 'zustand'
import { persist } from 'zustand/middleware'

type FavouriteFeaturesState = {
  favouriteFeatures: string[]
  toggleFavouriteFeature: (featureId: string) => boolean
  isFavouriteFeature: (featureId: string) => boolean
}

export const useFavouriteFeaturesStore = create(
  persist<FavouriteFeaturesState>(
    (set, get) => ({
      favouriteFeatures: [],
      toggleFavouriteFeature: (featureId) => {
        const list = get().favouriteFeatures
        if (list.includes(featureId)) {
          set({ favouriteFeatures: list.filter((id) => id !== featureId) })
          return false
        }
        set({ favouriteFeatures: [...list, featureId] })
        return true
      },
      isFavouriteFeature: (featureId: string) => {
        const list = get().favouriteFeatures
        return list.includes(featureId)
      },
    }),
    {
      name: 'favourite-features-storage',
    },
  ),
)
