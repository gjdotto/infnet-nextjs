import Link from "next/link";
import { Perfil } from "src/components/Perfil";
import { ImExit } from "react-icons/im";
import { RiContactsBookFill, RiLoginCircleFill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

const bottomNavigationHeight = "48px";

export function BottomNavigation() {
  const { data, status } = useSession();

  return (
    <div className="bottom-navigation">
      <a className="item" href="/contact" title="Formulário de contato">
        <RiContactsBookFill size="25px" aria-label="Contato" />
      </a>
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
        <a className="item" href="/api/auth/signin" title="Login">
          <RiLoginCircleFill size="25px" aria-label="Login" />
        </a>
      )}
      <span className="item">
        <Link href={data?.user ? "/user/profile" : "/signup"}>
          <Perfil
            size={25}
            name={data?.user.name}
            src={data?.user.name ? undefined : "/avatar.jpeg"}
            alt=""
          />
        </Link>
      </span>
      <style jsx>{`
        .bottom-navigation {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: #6ebcea;
          border-top: 1px solid #ccc;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: ${bottomNavigationHeight};
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        :global(body) {
          padding-bottom: ${bottomNavigationHeight};
        }

        @media (min-width: 600px) {
          .bottom-navigation {
            display: none !important; 
          }
        }
      `}</style>
    </div>
  );
}
