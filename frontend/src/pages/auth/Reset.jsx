import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form className="form">
            <input
              type="password"
              placeholder="New Password"
              name="password"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              name="password"
              required
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              style={{ marginBottom: "1rem" }}
            >
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
