import React from "react";
import styles from "./Sidebar.module.scss"
import cn from "classnames"
import {Link} from "react-router-dom";
import {features} from "../../../features";

const Sidebar = ({backgroundColor}: { backgroundColor: string }) => {

  return (
    <div className={styles.sidebar} style={{background: backgroundColor}}>
      <div className={styles.sidebarSearch}>
        <input
          className={styles.sidebarSearchInput}
          placeholder="Search..."
        />
        <div className={styles.sidebarSearchRight}>
          ⌘+K
        </div>
      </div>
      <div className={cn(styles.sidebarInside, styles.scrollbar)}>
        {features.map(Feature => (
          <Link key={Feature.id} to={`/features/${Feature.id}`} className={styles.menuItem}>
            <Feature.sidebarIcon className={""} size={16} />
            {Feature.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
