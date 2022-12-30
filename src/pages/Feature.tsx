import {Link, useParams} from "react-router-dom";
import {features} from "../features";
import {useMemo} from "react";
import FeatureHeader from "../components/organisms/feature-header/FeatureHeader";

const FeaturePage = () => {

  const {id} = useParams<{id: string}>();

  const feature = useMemo(() => {
    return features.find(f => f.id === id)
  }, [id]);

  if(!feature){
    return null
  }

  return <>
    <FeatureHeader feature={feature} />
    <div style={{flex: 1, display: "flex", flexDirection: "column", padding: 12}}>
      <feature.component key={feature.id} />
    </div>
  </>
}

export default FeaturePage
