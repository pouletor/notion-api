import { useState } from "react";

import styles from "./FormWed.module.scss";
import { FormError, FormSuccess, Guests } from "./FormWedComponents";

const maxInvites = 5;

export default function Form() {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfOmnivore, setNumberOfOmnivore] = useState(0);
  const [numberOfVegetarien, setNumberOfVegetarien] = useState(0);
  const [numberOfPescoVege, setNumberOfPescoVege] = useState(0);
  const [numberOfVegetalien, setNumberOfVegetalien] = useState(0);
  const [isReception, setIsReception] = useState(false);
  const [isBrunch, setIsBrunch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const isEqualTotalRegimeTotalGuests = () => {
    const totalRegimeAlimentaire =
      numberOfOmnivore +
      numberOfVegetarien +
      numberOfPescoVege +
      numberOfVegetalien;

    return totalRegimeAlimentaire === numberOfGuests;
  };

  const handleReception = (e: { target: { value: string } }) => {
    setIsReception(e.target.value === "oui");
  };

  const handleBrunch = (e: { target: { value: string } }) => {
    setIsBrunch(e.target.value === "oui");
  };

  const isDisabled = !isBrunch && !isReception;
  const disabledFieldset = isDisabled ? styles["field--disabled"] : "";
  const disabledRegime = isDisabled
    ? styles["total-regime-alimentaire--disabled"]
    : styles["total-regime-alimentaire"];

  const handleNumberOfGuest = (nb: number) => {
    if (nb <= maxInvites) {
      setNumberOfGuests(nb);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const target = event.target as typeof event.target & {
      [key: string]: { value: string; disabled?: boolean };
    };

    const isTotalRegimeTotalGuestEnabled =
      !target.isEqualTotalRegimeTotalGuests?.disabled;

    if (
      isTotalRegimeTotalGuestEnabled &&
      target.isEqualTotalRegimeTotalGuests?.value === "wrong"
    ) {
      alert("Le compte n'est pas bon dans régime alimentaire");

      return false;
    }

    // Get data from the form.
    const data = {
      nom: target.nom.value,
      prenom: target.prenom.value,
      email: target.email.value,
      telephone: target.telephone.value,
      nb_personnes: Number(target.nb_personnes.value),
      commentaires: target.commentaires.value,
      mairie: target.mairie.value,
      reception: target.reception.value === "oui",
      brunch: target.brunch.value === "oui",
      ...(!isDisabled && {
        omnivore: Number(target.omnivore.value),
        vegetarien: Number(target.vegetarien.value),
        "pesco-vegetarien": Number(target["pesco-vegetarien"].value),
        vegetalien: Number(target.vegetalien.value),
        allergies: target.allergies.value,
        navette: target.navette.value,
      }),
      ...(target.prenom1?.value &&
        target.nom1?.value && {
          plus1: `${target.prenom1?.value} ${target.nom1?.value} ${target.age1?.value}`,
        }),
      ...(target.prenom2?.value &&
        target.nom2?.value && {
          plus2: `${target.prenom2?.value} ${target.nom2?.value} ${target.age2?.value}`,
        }),
      ...(target.prenom3?.value &&
        target.nom3?.value && {
          plus3: `${target.prenom3?.value} ${target.nom3?.value} ${target.age3?.value}`,
        }),
      ...(target.prenom4?.value &&
        target.nom4?.value && {
          plus4: `${target.prenom4?.value} ${target.nom4?.value} ${target.age4?.value}`,
        }),
      ...(target.prenom5?.value &&
        target.nom5?.value && {
          plus5: `${target.prenom5?.value} ${target.nom5?.value} ${target.age5?.value}`,
        }),
    };

    try {
      setIsLoading(true);

      // Send the form data to our forms API on Vercel and get a response.
      await fetch("/api/form/updateWed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  if (isSuccess) {
    return <FormSuccess />;
  }

  if (isError) {
    return <FormError />;
  }

  return (
    <>
      <div>
        {`Tous les champs sont requis, sauf s’ils ont la mention "optionnel"`}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset className={styles["field--marginb"]}>
          <legend>Qui êtes-vous ?</legend>
          <div
            className={`${styles["field-multiple"]} ${styles["field-multiple--nomargintop"]}`}
          >
            <div className={styles.field}>
              <label htmlFor="prenom">Votre prénom</label>
              <input type="text" id="prenom" name="prenom" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="nom">Votre nom</label>
              <input type="text" id="nom" name="nom" required />
            </div>
          </div>
          <div className={styles["field-multiple"]}>
            <div className={styles.field}>
              <label htmlFor="email">Votre email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="telephone">Numéro de téléphone</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                id="telephone"
                name="telephone"
                required
              />
            </div>
          </div>
        </fieldset>

        <div
          className={`${styles["field-multiple"]} ${styles["field--marginb"]}`}
        >
          <div className={styles.field}>
            <label htmlFor="nb_personnes">
              Pour combien de personnes remplissez-vous ce formulaire ? /
              Combien serez-vous au total en vous incluant ?
            </label>
            <input
              type="number"
              id="nb_personnes"
              name="nb_personnes"
              onChange={(e) => {
                handleNumberOfGuest(Number(e.target.value));
              }}
              value={numberOfGuests}
              min={1}
              max={maxInvites}
            />
          </div>
        </div>

        <Guests total={numberOfGuests} />

        <fieldset className={styles["field--marginb"]}>
          <legend>Serez-vous présent pour :</legend>

          <div
            className={`${styles["field-multiple"]} ${styles["field-multiple--nomargintop"]}`}
          >
            <label>- la mairie ?</label>
            <div className={styles.fieldRow}>
              <div className={styles.fieldRadio}>
                <label htmlFor="mairie_oui">Oui</label>
                <input
                  type="radio"
                  id="mairie_oui"
                  name="mairie"
                  value="oui"
                  required
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="mairie_non">Non</label>
                <input
                  type="radio"
                  id="mairie_non"
                  name="mairie"
                  value="non"
                  required
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="mairie_maybe">Peut-être</label>
                <input
                  type="radio"
                  id="mairie_maybe"
                  name="mairie"
                  value="maybe"
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles["field-multiple"]}>
            <label>- la réception ?</label>
            <div className={styles.fieldRow}>
              <div className={styles.fieldRadio}>
                <label htmlFor="reception_oui">Oui</label>
                <input
                  type="radio"
                  id="reception_oui"
                  name="reception"
                  value="oui"
                  required
                  onChange={handleReception}
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="reception_non">Non</label>
                <input
                  type="radio"
                  id="reception_non"
                  name="reception"
                  value="non"
                  required
                  onChange={handleReception}
                />
              </div>
            </div>
          </div>
          <div className={styles["field-multiple"]}>
            <label>- au brunch le lendemain matin ?</label>
            <div className={styles.fieldRow}>
              <div className={styles.fieldRadio}>
                <label htmlFor="brunch_oui">Oui</label>
                <input
                  type="radio"
                  id="brunch_oui"
                  name="brunch"
                  value="oui"
                  required
                  onChange={handleBrunch}
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="brunch_non">Non</label>
                <input
                  type="radio"
                  id="brunch_non"
                  name="brunch"
                  value="non"
                  required
                  onChange={handleBrunch}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={`${disabledFieldset} ${styles["field--marginb"]}`}>
          <legend>Restrictions alimentaires</legend>

          <div
            className={`${styles["field-multiple"]} ${styles["field-multiple--nomargintop"]}`}
          >
            <label>- Régimes alimentaires (en nombre de personnes)</label>

            <div className={styles.fieldRow}>
              <div className={styles.fieldNumber}>
                <label htmlFor="omnivore">omnivore</label>
                <input
                  type="number"
                  id="omnivore"
                  name="omnivore"
                  defaultValue={numberOfOmnivore}
                  onChange={(e) => {
                    setNumberOfOmnivore(Number(e.target.value));
                  }}
                  min={0}
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className={styles.fieldNumber}>
                <label htmlFor="vegetarien">végétarien</label>
                <input
                  type="number"
                  id="vegetarien"
                  name="vegetarien"
                  defaultValue={numberOfVegetarien}
                  onChange={(e) => {
                    setNumberOfVegetarien(Number(e.target.value));
                  }}
                  min={0}
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className={styles.fieldNumber}>
                <label htmlFor="pesco-vegetarien">pesco-végétarien</label>
                <input
                  type="number"
                  id="pesco-vegetarien"
                  name="pesco-vegetarien"
                  defaultValue={numberOfPescoVege}
                  onChange={(e) => {
                    setNumberOfPescoVege(Number(e.target.value));
                  }}
                  min={0}
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className={styles.fieldNumber}>
                <label htmlFor="vegetalien">végétalien</label>
                <input
                  type="number"
                  id="vegetalien"
                  name="vegetalien"
                  defaultValue={numberOfVegetalien}
                  onChange={(e) => {
                    setNumberOfVegetalien(Number(e.target.value));
                  }}
                  min={0}
                  required
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>

          <div className={disabledRegime}>
            Le total (
            {numberOfOmnivore +
              numberOfVegetarien +
              numberOfPescoVege +
              numberOfVegetalien}
            ) doit correspondre au nombre de personnes du formulaire (
            {numberOfGuests}).{" "}
            {isEqualTotalRegimeTotalGuests() ? (
              `C'est parfait`
            ) : (
              <span
                className={styles["total-regime-alimentaire-caption"]}
              >{`Le compte n'est pas bon Kévin`}</span>
            )}
            <input
              type="hidden"
              id="isEqualTotalRegimeTotalGuests"
              name="isEqualTotalRegimeTotalGuests"
              disabled={isDisabled}
              value={isEqualTotalRegimeTotalGuests() ? "correct" : "wrong"}
            />
          </div>

          <div
            className={`${styles["field-multiple"]} ${disabledFieldset} ${styles["field--marginb"]}`}
          >
            <div className={styles.field}>
              <label htmlFor="allergies">
                - Allergies ?{" "}
                <span className={styles.caption}>(optionnel)</span>
              </label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                disabled={isDisabled}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={`${disabledFieldset} ${styles["field--marginb"]}`}>
          <legend>Pensez-vous avoir besoin de la navette ? :)</legend>

          <div
            className={`${styles["field-multiple"]} ${styles["field-multiple--nomargintop"]}`}
          >
            <div className={styles.fieldRow}>
              <div className={styles.fieldRadio}>
                <label htmlFor="navette_oui">Oui</label>
                <input
                  type="radio"
                  id="navette_oui"
                  name="navette"
                  value="oui"
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="navette_non">Non</label>
                <input
                  type="radio"
                  id="navette_non"
                  name="navette"
                  value="non"
                  required
                  disabled={isDisabled}
                />
              </div>
              <div className={styles.fieldRadio}>
                <label htmlFor="navette_maybe">Peut-être</label>
                <input
                  type="radio"
                  id="navette_maybe"
                  name="navette"
                  value="maybe"
                  required
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div
          className={`${styles["field-multiple"]} ${styles["field--marginb"]}`}
        >
          <div className={styles.field}>
            <label htmlFor="commentaires">
              Des commentaires / suggestions / un petit message à nous laisser ?{" "}
              <span className={styles.caption}>(optionnel)</span>
            </label>
            <textarea id="commentaires" cols={5} rows={5} />
          </div>
        </div>

        <div className={styles.submitWrapper}>
          {isLoading && (
            <div className={styles.spinnerWrapper}>{"chargement en cours"}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${
              isLoading ? styles["submitButton--loading"] : ""
            }`}
          >
            Valider le formulaire
          </button>
        </div>
      </form>
    </>
  );
}
