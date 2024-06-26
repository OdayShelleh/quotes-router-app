import MainHeader from "./MainHeader";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
