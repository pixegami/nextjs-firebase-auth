import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: any) => {
  return (
    <div className="text-lg text-gray-700 flex">
      <div className="mx-auto max-w-sm w-full">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
