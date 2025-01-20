async function initMSW() {
  if (typeof window === "undefined") {
    const { server } = await import("./server");

    console.log("server mock");
    server.listen();
  } else {
    const { worker } = await import("./browser");

    console.log("broswer mock");
    worker.start();
  }
}

export { initMSW };
