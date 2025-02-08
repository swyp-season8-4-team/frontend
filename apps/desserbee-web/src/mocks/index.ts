async function initServerMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    console.log('🌌 Server mock initialized');
    server.listen();
  }
}

export { initServerMSW };
