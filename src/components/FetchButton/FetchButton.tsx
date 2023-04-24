import { useState } from "react";

const TITLE_COLUMN = "Nom";
const CREATION_DATE_COLUMN = "Date de création";

const getDDMMYYYY = (iso_date) => {
  const date = new Date(iso_date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function FetchButton() {
  const [data, setData] = useState([]);

  const fetchDatabase = async () => {
    const res = await fetch("/api/form/query");
    const {
      data: { results = [] },
    } = await res.json();

    setData(results);
  };

  return (
    <>
      <button type="button" onClick={fetchDatabase}>
        Afficher le nom et la date renseignés dans la base de données
      </button>

      {data.map(({ id, properties }) => {
        const name = properties[TITLE_COLUMN]?.title[0]?.plain_text;
        const created_time = getDDMMYYYY(
          properties[CREATION_DATE_COLUMN]?.created_time
        );

        return (
          <div key={id}>
            {name}
            {" - "}
            {created_time}
            {" - "}
            {properties.favorite_number?.number}
          </div>
        );
      })}
    </>
  );
}
