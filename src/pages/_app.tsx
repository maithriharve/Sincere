import type { AppProps } from "next/app";
import "@/styles/globals.css";

import { useMocks } from "@/mocks";

export default function App({ Component, pageProps }: AppProps) {
  const isReady = useMocks();

  if (!isReady) return null;

  return <Component {...pageProps} />;
}
