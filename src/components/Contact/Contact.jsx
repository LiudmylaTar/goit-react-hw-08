import css from "./Contact.module.css";
import { ImMobile } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";
import { ConfirmDeleteContact } from "../ConfirmDeletedContact/ConfirmDeletedContact";
import { RiEdit2Line } from "react-icons/ri";
import ContactForm from "../ContactForm/ContactForm";
import { useState } from "react";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [localContact, setLocalContact] = useState(contact);

  const handleEdit = async (values) => {
    try {
      const { id, ...cleanedData } = values;
      const resultAction = await dispatch(
        editContact({ id, updatedData: cleanedData })
      );
      if (editContact.fulfilled.match(resultAction)) {
        toast.success("Contact successfully updated!");
        setLocalContact(resultAction.payload);
        setIsEditing(false);
      } else {
        toast.error("Failed to update contact.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  if (isEditing) {
    return (
      <ContactForm
        initialValues={{
          id: localContact?.id,
          name: localContact.name,
          number: localContact.number,
        }}
        onSubmit={handleEdit}
        buttonText="Save"
      />
    );
  }

  const handleDelete = () => {
    const toastId = toast.info(
      <ConfirmDeleteContact
        contact={contact}
        onConfirm={() => {
          dispatch(deleteContact(contact.id));
          toast.dismiss(toastId);
          toast.success(`Deleted ${contact.name}`);
        }}
        onCancel={() => toast.dismiss(toastId)}
      />,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };
  return (
    <>
      <div className={css.contact}>
        <div className={css.wrapper}>
          <span className={css.icon}>
            <IoPerson size="16" />
          </span>
          <p>{localContact.name}</p>
        </div>
        <div className={css.wrapper}>
          <span className={css.icon}>
            <ImMobile size="16" />
          </span>
          <p>{localContact.number}</p>
        </div>
      </div>
      <div className={css.btn_wrapper}>
        <button className={css.delete} onClick={handleDelete}>
          ❌
        </button>
        <button
          className={css.edit}
          onClick={() => setIsEditing(true)}
          type="button"
        >
          <RiEdit2Line size={20} />
        </button>
      </div>
    </>
  );
}
