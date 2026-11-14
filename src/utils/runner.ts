export interface OutputEntry {
  id: string;
  type: 'prompt' | 'alert' | 'log' | 'error' | 'warn';
  text: string;
  label?: string;
  value?: string | number;
  timestamp: number;
}

export interface RunResult {
  entries: OutputEntry[];
  executionTimeMs: number;
  success: boolean;
  error?: string;
}

export function executeJsCode(
  code: string,
  inputValues: (string | number)[]
): RunResult {
  const startTime = performance.now();
  const entries: OutputEntry[] = [];
  const promptQueue = [...inputValues];
  let promptIndex = 0;

  const promptFn = (message?: unknown) => {
    const rawVal = promptQueue[promptIndex];
    promptIndex += 1;
    const value = rawVal !== undefined ? rawVal : "";
    const label = message !== undefined && message !== null ? String(message) : "Оролт";
    entries.push({
      id: Math.random().toString(36).substring(2, 9),
      type: 'prompt',
      text: `${label} → ${String(value)}`,
      label,
      value,
      timestamp: Date.now()
    });
    return value;
  };

  const alertFn = (message?: unknown) => {
    entries.push({
      id: Math.random().toString(36).substring(2, 9),
      type: 'alert',
      text: String(message ?? ""),
      timestamp: Date.now()
    });
  };

  const consoleProxy = {
    log: (...args: unknown[]) => {
      entries.push({
        id: Math.random().toString(36).substring(2, 9),
        type: 'log',
        text: args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))).join(" "),
        timestamp: Date.now()
      });
    },
    error: (...args: unknown[]) => {
      entries.push({
        id: Math.random().toString(36).substring(2, 9),
        type: 'error',
        text: args.map((arg) => String(arg)).join(" "),
        timestamp: Date.now()
      });
    },
    warn: (...args: unknown[]) => {
      entries.push({
        id: Math.random().toString(36).substring(2, 9),
        type: 'warn',
        text: args.map((arg) => String(arg)).join(" "),
        timestamp: Date.now()
      });
    }
  };

  let success = true;
  let errorMsg: string | undefined;

  try {
    // Construct isolated function wrapper
    const runner = new Function("prompt", "alert", "console", code);
    runner(promptFn, alertFn, consoleProxy);
  } catch (err: unknown) {
    success = false;
    errorMsg = err instanceof Error ? err.message : String(err);
    entries.push({
      id: Math.random().toString(36).substring(2, 9),
      type: 'error',
      text: `Алдаа: ${errorMsg}`,
      timestamp: Date.now()
    });
  }

  const endTime = performance.now();
  const executionTimeMs = Math.round((endTime - startTime) * 100) / 100;

  return {
    entries,
    executionTimeMs,
    success,
    error: errorMsg
  };
}

export function playAudioChime(type: 'success' | 'click' | 'clear' = 'success') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {
    // AudioContext might be blocked or not supported, ignore safely
  }
}
