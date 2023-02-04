import HomepageHeader from '../../components/organisms/homepage-header/HomepageHeader'
import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <div className={styles.page}>
      <HomepageHeader />
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.title}>Welcome to Craze App!</div>
          <div className={styles.subtitle}>
            Craze app is an desktop application created to help developers. Also, craze is an open
            source application and you can contribute to its development. We know you can do this
            because if you weren`t a programmer you wouldn`t be reading this text :)
          </div>
          <ul className={styles.list}>
            <li>- You can access all the features from the left menu.</li>
            <li>
              - Dont be worry to switch to another feature while using one feature because your data
              will not be lost.
            </li>
            <li>- You can use the cmd+k shortcut to quickly switch between features.</li>
            <li>
              - You can pin the features you use frequently to the top of the list by using the
              heart in the top menu.
            </li>
            <li>
              - Dont forget to use the pin icon in the top right when switching between craze and
              other apps.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
