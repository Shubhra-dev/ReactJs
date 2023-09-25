import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "../components/Logo";
import AppNav from "../components/AppNav";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; All Right Reserved</p>
      </footer>
    </div>
  );
}

export default Sidebar;
