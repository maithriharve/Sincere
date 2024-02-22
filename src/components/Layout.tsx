import Head from "next/head";

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>To Do App</title>
      </Head>

      <main
        id="content"
        aria-label="content"
        className="mx-auto max-w-4xl px-4 py-6"
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
