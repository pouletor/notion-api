import Link from "next/link";

import styles from "./Menu.module.scss";

type Props = {
  activeMenu?: string;
};

export default function Menu({ activeMenu }: Props) {
  const menuItems = [
    {
      label: "Accueil",
      name: "home",
      link: "/",
    },
    {
      label: "Formulaire",
      name: "form",
      link: "/form",
    },
  ];

  return (
    <header className={styles.menu}>
      {menuItems.map(({ label, link, name }) => (
        <Link
          href={link}
          className={`${styles.link} ${
            name === activeMenu ? styles.activeLink : ""
          }`}
          key={name}
        >
          {label}
        </Link>
      ))}
    </header>
  );
}
