import css from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  return (
    <div className={css.wrapper}>
      <h2>
        {isLoggedIn ? (
          <>
            Welcome <br /> {user?.name}
          </>
        ) : (
          <>
            Contact App <br /> Welcome page
          </>
        )}
      </h2>
    </div>
  );
}
