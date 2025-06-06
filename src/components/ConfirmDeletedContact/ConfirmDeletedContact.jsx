import css from "./ConfirmDeletedContact.module.css"; // стилі за бажанням

export function ConfirmDeleteContact({ contact, onConfirm, onCancel }) {
  return (
    <div>
      <p>
        Delete <strong>{contact.name}</strong>'s number?
      </p>
      <div className={css.actions}>
        <button onClick={onConfirm} className={css.yes}>
          ✔️ Yes
        </button>
        <button onClick={onCancel} className={css.no}>
          ❌ No
        </button>
      </div>
    </div>
  );
}
