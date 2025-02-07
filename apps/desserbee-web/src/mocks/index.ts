async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');

    console.log('server mock');
    server.listen();
  } else {
    const { worker } = await import('./browser');

    console.log('broswer mock');
    await worker.start({
      onUnhandledRequest: 'bypass', // 모든 미처리 요청 무시
    });
  }
}

export { initMSW };
