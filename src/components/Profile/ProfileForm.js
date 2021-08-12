import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const passwordRef = useRef();

  const onClickHandler = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAIhjWhdqrZn3v1SfKiO-3JQnO_1t4nBm4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: password,
          returnSecureToken: false,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Couldn't change password");
          });
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={onClickHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
