import React from "react";
import classes from './app.module.less';
import LoginForm from "./components/LoginForm";

const App: React.FC = (props) => {

  return (
    <div className={classes.App}>
      <LoginForm />
    </div>
  )

}

export default App;