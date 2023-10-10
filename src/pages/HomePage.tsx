import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { features } from '../features'
import { useLastUsedFeatureStore } from '../stores/LastUsedFeatureStore'

const HomePage = () => {
  const history = useHistory()
  const { lastUsedFeatureId } = useLastUsedFeatureStore()

  const redirectLastUsedFeature = () => {
    const feature = features.find((feature) => feature.id === lastUsedFeatureId)
    if (!feature) {
      history.replace(`/features/${features[0].id}`)
      return
    }
    history.replace(`/features/${feature.id}`)
  }

  useEffect(() => {
    redirectLastUsedFeature()
  }, [])

  return null
}

export default HomePage
