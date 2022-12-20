import Link from "next/link";
import { ImExit } from "react-icons/im";
import { RiContactsBookFill, RiLoginCircleFill } from "react-icons/ri";
import { Perfil } from "src/components/Perfil";
import { signOut, useSession } from "next-auth/react";
import { FaUserPlus } from "react-icons/fa";

export function MenuBarItems() {
  const { data, status } = useSession();

  return (
    <div className="menu-bar-items">
      <span className="item">
      <Link href="/contact" title="Formulário de contato">
        <RiContactsBookFill size="25px" aria-label="Contato" />
      </Link>
      </span>
      {status === "authenticated" && (
        <>
          <a
            href="/api/auth/signout"
            className="item"
            title="Sair"
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            <ImExit size="25px" aria-label="Sair" />
          </a>
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <a className="item" href="/api/auth/signin" title="Login">
            <RiLoginCircleFill size="25px" aria-label="Login" />
          </a>
          <span className="item">

          <Link className="item" href="/signup" title="Registrar">
            <FaUserPlus size="25px" aria-label="Registrar usuário" />
          </Link>
          </span>
        </>
      )}
      <span className="item">
        <Link href={data?.user ? "/user/profile" : "/signup"}>
          <Perfil
            size={30}
            name={data?.user.name}
            src={data?.user.name ? undefined : "/avatar.jpeg"}
            alt=""
          />
        </Link>
      </span>
      <style jsx>{`
        .menu-bar-items {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .item {
          display: flex;
          align-items: center;
          color: #fff;
        }

        .item:not(:first-child) {
          margin-left: 22px;
        }
      `}</style>
    </div>
  );
}