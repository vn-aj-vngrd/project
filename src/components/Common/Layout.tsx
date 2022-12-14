type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div>
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center  px-5 md:px-0">
          <main className="md:px-8">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
