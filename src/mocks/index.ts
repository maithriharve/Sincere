import { useEffect, useState } from "react";

export const initMocks = async () => {
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  } else {
    const { worker } = await import("./browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
};

// Workaround MSW initialization race in Next.js 13
// https://github.com/mswjs/msw/discussions/1049#discussioncomment-1941348
// https://github.com/vercel/next.js/discussions/39695

export const useMocks = () => {
  const [shouldRender, setShouldRender] = useState(
    !process.env.NEXT_PUBLIC_API_MOCKING,
  );

  useEffect(() => {
    async function setupMocks() {
      const { initMocks } = await import("@/mocks");
      await initMocks();
      setShouldRender(true);
    }

    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      setupMocks();
    }
  }, []);

  return shouldRender;
};
