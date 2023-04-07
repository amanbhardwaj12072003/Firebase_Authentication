import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../inputControl/InputControl";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    // Check for all fields
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("All fields are required!");
      return;
    }
    setErrorMsg("");

    // If all fields are filled....create the user with that email and password
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user
        setSubmitButtonDisabled(false);
        await updateProfile((user), {
          displayName: values.name
        })
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sign Up</h1>
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          label="Name"
          placeholder="Enter email name"
        />
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          label="Email"
          placeholder="Enter email address"
        />
        <InputControl
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          label="Password"
          placeholder="Enter your password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>Signup</button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">LogIn</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
