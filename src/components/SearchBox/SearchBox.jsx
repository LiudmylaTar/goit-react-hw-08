import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  changeContactSearch,
  selectNameFilter,
} from "../../redux/filters/slice";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const dispatch = useDispatch();
  const nameSearch = useSelector(selectNameFilter);

  const debouncedDispatch = useDebouncedCallback(
    (value) => {
      dispatch(changeContactSearch(value));
    },
    // delay in ms
    500
  );

  const handleChange = (e) => {
    debouncedDispatch(e.target.value);
  };
  return (
    <div className={css.wrapper}>
      <p>Find contacts by name</p>
      <input
        defaultValue={nameSearch}
        onChange={handleChange}
        className={css.fild}
        type="text"
        name="text"
        placeholder="Please start input name for search"
      />
    </div>
  );
}
