import styles from "./FeatureHeader.module.scss"
import {Feature} from "../../../features";
import cn from "classnames";

type FeatureHeaderProps = {
  feature: Feature
}

const FeatureHeader = (props: FeatureHeaderProps) => {
  return (
    <div className={cn(styles.header, "draggable-area")}>
      <div className={styles.featureName}>{props.feature.title}</div>
    </div>
  )
}

export default FeatureHeader
