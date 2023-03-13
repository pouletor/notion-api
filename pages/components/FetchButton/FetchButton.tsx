export default function FetchButton() {
  const fetchDatabase = async () => {
    const res = await fetch("/api/form/query");
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <button type="button" onClick={fetchDatabase}>
        fetch notion
      </button>
    </>
  );
}
