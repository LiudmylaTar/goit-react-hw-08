import ContactForm from "./ContactForm";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";

export default function ContactWrapper({ contact = null, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      if (contact && contact.id) {
        // Edit
        const result = await dispatch(
          editContact({
            id: contact.id,
            updatedData: values,
          })
        );
        if (editContact.fulfilled.match(result)) {
          toast.success("Contact updated");
          onClose?.();
        } else {
          console.warn("Update rejected:", result);
          toast.error("Failed to update contact");
        }
      } else {
        // ADD
        const { id, ...newContact } = values;

        const result = await dispatch(addContact(newContact));

        if (addContact.fulfilled.match(result)) {
          toast.success("Contact added");
          actions.resetForm();
        } else {
          console.warn("Add contact rejected:", result);
          toast.error("Failed to add contact");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  return (
    <ContactForm
      initialValues={{
        id: contact?.id,
        name: contact ? contact.name : "",
        number: contact ? contact.number : "",
      }}
      onSubmit={handleSubmit}
    />
  );
}
