import styles from '../styles/Home.module.css'
import profilePic from '../public/profilePicture.png'

function Home() {
  var top = <p className={styles.top}>oleksii<span>besida</span></p>

  var title = <div className={styles.title}>
    <img src='./profilePicture.png' alt="Profile picture"></img>
    <p>Oleksii</p>
  </div>;

  var descrption = <p className={styles.description}>Redefining the way humans interact
    with computers.</p>

  var container = <div className={styles.container}>
    {title}{descrption}
  </div>;

  var page = <div className={styles.page}>{top}{container}</div>;
  return page;
}

export default Home
