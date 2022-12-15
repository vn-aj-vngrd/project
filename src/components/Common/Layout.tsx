import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="mx-auto flex flex-col min-h-screen w-full max-w-7xl items-center justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
