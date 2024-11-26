import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${GeistSans.style.fontFamily};
        }
      `}</style>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
