import { useState } from "react";

import styles from "./Form.module.scss";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const target = event.target as typeof event.target & {
      [key: string]: { value: string; disabled?: boolean };
    };

    // Get data from the form.
    const data = {
      nom: target.nom.value,
      prenom: target.prenom.value,
      ...(target.email.value && {
        email: target.email.value,
      }),
      ...(target.telephone.value && {
        telephone: target.telephone.value,
      }),
      ...(target.weather.value && {
        weather: target.weather.value,
      }),
      ...(target.commentaires.value && {
        commentaires: target.commentaires.value,
      }),
      ...(target.favorite_number.value && {
        favorite_number: Number(target.favorite_number.value),
      }),
    };

    try {
      setIsLoading(true);

      // Send the form data to our forms API on Vercel and get a response.
      await fetch("/api/form/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsLoading(false);

      alert("SUCCESS TO UPDATE THE DATABASE");
    } catch (error) {
      setIsLoading(false);

      alert("ERROR TO UPDATE THE DATABASE");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="prenom">Votre prénom (requis)</label>
        <input type="text" id="prenom" name="prenom" required />
      </div>
      <div>
        <label htmlFor="nom">Votre nom (requis)</label>
        <input type="text" id="nom" name="nom" required />
      </div>

      <div>
        <label htmlFor="email">Votre email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="telephone">Numéro de téléphone</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="telephone"
          name="telephone"
        />
      </div>
      <div>
        <label htmlFor="favorite_number">Votre nombre préféré ?</label>
        <input
          type="number"
          id="favorite_number"
          name="favorite_number"
          min={1}
        />
      </div>
      <div>
        <label>{"Est-ce qu'il fait beau aujourd'hui ?"}</label>
        <div>
          <label htmlFor="weather_oui">Oui</label>
          <input type="radio" id="weather_oui" name="weather" value="oui" />
        </div>
        <div>
          <label htmlFor="weather_non">Non</label>
          <input type="radio" id="weather_non" name="weather" value="non" />
        </div>
      </div>
      <div>
        <label htmlFor="commentaires">Un commentaire ?</label>
        <textarea id="commentaires" cols={20} rows={5} />
      </div>

      <button type="submit" disabled={isLoading}>
        Valider le formulaire
      </button>
    </form>
  );
}
