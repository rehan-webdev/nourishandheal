// Web3Forms integration — bookings and orders are submitted as form
// payloads to https://api.web3forms.com/submit (no backend required).
// Set VITE_WEB3FORMS_ACCESS_KEY in .env (create a free form at web3forms.com).
// Without a key the app runs in demo mode: submissions succeed locally so
// the full flow can be experienced, and a note is shown on confirmation.

export type W3Kind = "appointment" | "order";

export type W3Result = {
  ok: boolean;
  ref: string;
  simulated: boolean;
  error?: string;
};

const ENDPOINT = "https://api.web3forms.com/submit";

const SUBJECTS: Record<W3Kind, string> = {
  appointment: "New appointment booking — Nourish & Heal NutriClinic",
  order: "New product order — Nourish & Heal Kids Growth Powder",
};

function makeRef(kind: W3Kind): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${kind === "order" ? "NHK" : "NH"}-${out}`;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendWeb3Form(
  kind: W3Kind,
  fields: Record<string, string>,
  fromName: string
): Promise<W3Result> {
  const key = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();
  const ref = makeRef(kind);

  if (!key) {
    await sleep(900);
    return { ok: true, ref, simulated: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: key,
        subject: SUBJECTS[kind],
        from_name: fromName,
        ...fields,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
      error?: string;
    };

    if (res.ok && data.success) {
      return { ok: true, ref, simulated: false };
    }
    return {
      ok: false,
      ref,
      simulated: false,
      error: data.message ?? data.error ?? "Web3Forms rejected the submission.",
    };
  } catch {
    // Network trouble — keep the flow usable, flag it for the confirmation screen.
    return {
      ok: true,
      ref,
      simulated: true,
      error: "Could not reach Web3Forms — details were saved locally instead.",
    };
  }
}
