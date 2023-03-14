import styles from "./FormWed.module.scss";

type GuestsProps = {
  total: number;
};

type GuestProps = {
  numero: number;
};

export const Guests = ({ total }: GuestsProps) => {
  if (total === 1) {
    return null;
  }

  const arr = Array.from({ length: total - 1 }, (_, index) => index + 1);

  return (
    <>
      {arr.map((index) => (
        <Guest numero={index} key={index} />
      ))}
    </>
  );
};

export const Guest = ({ numero }: GuestProps) => {
  const prenomId = `prenom${numero}`;
  const nomId = `nom${numero}`;
  const ageId = `age${numero}`;

  return (
    <fieldset className={styles["field--marginb"]}>
      <legend>+{numero}</legend>
      <div
        className={`${styles["field-multiple"]} ${styles["field-multiple--nomargintop"]}`}
      >
        <div className={styles.field}>
          <label htmlFor={prenomId}>Prénom</label>
          <input type="text" id={prenomId} name={prenomId} required />
        </div>
        <div className={styles.field}>
          <label htmlFor={nomId}>Nom</label>
          <input type="text" id={nomId} name={nomId} required />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={ageId}>
          {`Pouvez-vous préciser l’age si c'est un enfant :)`}{" "}
          <span className={styles.caption}>(optionnel)</span>
        </label>
        <input type="number" id={ageId} name={ageId} min={0} />
      </div>
    </fieldset>
  );
};

export function FormSuccess() {
  return (
    <div className={styles.successMessage}>
      {`Merci d’avoir pris le temps de répondre à ce formulaire :)`}
    </div>
  );
}

export function FormError() {
  return (
    <div className={styles.errorMessage}>
      {`Oups, il semble y avoir eu une erreur lors de l'envoi du formulaire.`}
    </div>
  );
}
