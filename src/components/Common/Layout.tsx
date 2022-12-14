import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div>
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-5 md:px-0">
          <Header />
          <main className="md:px-8">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
