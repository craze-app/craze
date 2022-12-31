import React, {useMemo, useState} from "react";
import styles from "./Sidebar.module.scss"
import cn from "classnames"
import {Link} from "react-router-dom";
import {Feature, features} from "../../../features";
import Fuse from "fuse.js";

const fuseOptions = {
  keys: [
    "title",
    "id"
  ]
}

type SidebarProps = {
  backgroundColor: string
}

const Sidebar = (props: SidebarProps) => {

  const [searchQuery, setSearchQuery] = useState<string>("")
  const fuse = new Fuse(features, fuseOptions);

  const results: Feature[] = useMemo(() => {
    if(searchQuery === ""){
      return features
    }
    return fuse.search(searchQuery).map((item) => item.item)
  }, [searchQuery])

  return (
    <div className={styles.sidebar} style={{background: props.backgroundColor}}>
      <div className={cn(styles.sidebarHeader, "draggable-area")} />
      <div className={styles.sidebarSearch}>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={styles.sidebarSearchInput}
          placeholder="Search..."
        />
        <div className={styles.sidebarSearchRight}>
          ⌘+K
        </div>
      </div>
      <div className={cn(styles.sidebarInside, styles.scrollbar)}>
        {results.map(Feature => (
          <Link key={Feature.id} to={`/features/${Feature.id}`} className={styles.menuItem}>
            <Feature.sidebarIcon className={""} size={16}/>
            {Feature.title}
          </Link>
        ))}
      </div>
    </div>

  )
}

export default Sidebar
