import {Link, useParams} from "react-router-dom";
import {features} from "../features";
import {useMemo} from "react";

const FeaturePage = () => {

  const {id} = useParams<{id: string}>();

  const feature = useMemo(() => {
    return features.find(f => f.id === id)
  }, [id]);

  if(!feature){
    return null
  }

  return <feature.component key={feature.id} />
}

export default FeaturePage
