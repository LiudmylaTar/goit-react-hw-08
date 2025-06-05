import css from "./Contact.module.css";
import { ImMobile } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <>
      <div className={css.contact}>
        <div className={css.wrapper}>
          <span className={css.icon}>
            <IoPerson size="16" />
          </span>
          <p>{contact.name}</p>
        </div>
        <div className={css.wrapper}>
          <span className={css.icon}>
            <ImMobile size="16" />
          </span>
          <p>{contact.number}</p>
        </div>
      </div>
      <button className={css.btn} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
