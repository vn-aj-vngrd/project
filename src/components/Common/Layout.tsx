import Meta from "./Meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className="w-full bg-indigo-50 flex items-center justify-center min-h-screen">
          <main className="md:px-8">{children}</main>
      </div>
    </>
  );
};

export default Layout;
