import Link from "next/link";
import { WetravelLogo } from "src/components/Logo";
import { MenuBarItems } from "src/components/MenuBarItems";

const menubarHeight = "64px";

export function MenuBar() {
  return (
    <>
      <div className="menu-bar">
        <div className="menu-bar-content">
          <div className="row instagram-logo">
            <Link href="/">
              <h1>
                <WetravelLogo />
              </h1>
            </Link>
          </div>
          <div className="row menu-bar-items">
            <MenuBarItems />
          </div>
        </div>
        <style jsx>{`
          .menu-bar {
            background-color: #0277bd;
            border-bottom: 1px solid #ccc;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 0 8px;
            box-sizing: border-box;
            z-index: 1;
          }

          .menu-bar-content {
            margin: auto;
            max-width: 960px;
            display: flex;
            align-items: center;
            height: ${menubarHeight};
          }

          :global(body) {
            padding-top: ${menubarHeight};
          }

          @media (max-width: 600px) {
            .menu-bar-items {
              display: none;
            }

            .wetravel-logo {
              margin-right: 8px;
            }
          }

          @media (min-width: 600px) {
            .row {
              flex: 1;
            }
          }
        `}</style>
      </div>
    </>
  );
}
