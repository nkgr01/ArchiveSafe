// Simple notification composable fallback using browser alert/toast-like console logs.
export function useNotification() {
  const notify = (type: string, summary: string, detail: string) => {
    try {
      // For now, use a simple browser notification via console and alert for visibility in dev.
      console.log(`[${type.toUpperCase()}] ${summary}: ${detail}`);
      // Non-blocking visual fallback (avoid alert in production heavy flows)
      if (typeof window !== 'undefined' && window?.document) {
        // small ephemeral DOM toast
        const el = document.createElement('div');
        el.textContent = `${summary} — ${detail}`;
        el.className = 'fixed bottom-6 right-6 bg-surface-900 text-white px-4 py-2 rounded-md shadow-lg z-50';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3500);
      }
    } catch (e) {
      // best-effort
    }
  };

  return {
    success: (summary: string, detail: string) => notify('success', summary, detail),
    info: (summary: string, detail: string) => notify('info', summary, detail),
    warn: (summary: string, detail: string) => notify('warn', summary, detail),
    error: (summary: string, detail: string) => notify('error', summary, detail),
  };
}
