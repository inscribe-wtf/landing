import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { useAtom } from "jotai";
import { themeAtom, themes } from "../src/components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useAtom(themeAtom);

  return (
    <div data-theme={theme}>
      <MantineProvider
        theme={{
          colorScheme: themes.dark === theme ? "dark" : "light",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  );
}

export default MyApp;
