import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import FeatureHeader from '../../components/organisms/feature-header/FeatureHeader'
import { features } from '../../features'
import styles from './Feature.module.scss'

const FeaturePage = () => {
  const { id } = useParams<{ id: string }>()

  const feature = useMemo(() => {
    return features.find((f) => f.id === id)
  }, [id])

  if (!feature) {
    return null
  }

  return (
    <>
      <FeatureHeader feature={feature} />
      <div className={styles.featureContainer}>
        <feature.component key={feature.id} id={feature.id} />
      </div>
    </>
  )
}

export default FeaturePage
