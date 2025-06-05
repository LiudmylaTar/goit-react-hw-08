import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./ContactsPage.module.css";

export default function ContactPage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <ContactForm />
      </aside>
      <main className={css.content}>
        <h1>Phonebook</h1>
        <SearchBox />
        {loading && <Loader>Loading, please wait...</Loader>}
        {error && <Error>Error message</Error>}
        <ContactList />
      </main>
      <ToastContainer />
    </div>
  );
}
