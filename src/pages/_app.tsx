import Layout from "@/components/layout";
import { useViewTransitionRouterPush } from "@/hooks/useViewTransitionRouterPush";
import "@/styles/global.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { routerPushWithTransition } = useViewTransitionRouterPush();
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      routerPushWithTransition(as);
      return false;
    });
  }, [router, routerPushWithTransition]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
