import { MenuBar } from "./MenuBar";
import { Footer } from "./Footer";
import { BottomNavigation } from "./BottomNavigation";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <div className="layout">
      <nav>
        <MenuBar />
      </nav>
      <main className="content">{props.children}</main>
      <footer>
        <Footer />
      </footer>
      <nav>
        <BottomNavigation />
      </nav>
      <style jsx>{`
        .layout {
          max-width: 960px;
          margin: auto;
        }

        @media (max-width: 600px) {
          .content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
