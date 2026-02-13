import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  PORTFOLIO_CONTACTS?: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "/*",
  cors({
    origin: [
      "https://austinhumphrey.com",
      "https://austin-humphrey-professional-resume-portfolio.pages.dev",
    ],
  }),
);

// ── Health ──────────────────────────────────────────────────────────────────
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Profile ─────────────────────────────────────────────────────────────────
app.get("/api/profile", (c) => {
  return c.json({
    name: "Austin Humphrey",
    tagline: "Sports Intelligence | Product Strategy | AI-Assisted Analytics",
    summary:
      "Product-minded builder with deep experience in sports intelligence, advertising analytics, and AI-assisted development. Currently building BlazeSportsIntel.com — a real-time sports intelligence platform deployed on Cloudflare — while pursuing graduate and postgraduate studies in business management and artificial intelligence.",
    contact: {
      location: "San Antonio, TX",
      phone: "(210) 273-5538",
      emails: [
        "Austin@BlazeSportsIntel.com",
        "humphrey.austin20@gmail.com",
      ],
      linkedin: "linkedin.com/in/ahump20",
      websites: ["BlazeSportsIntel.com", "AustinHumphrey.com"],
    },
  });
});

// ── Assets ──────────────────────────────────────────────────────────────────
app.get("/api/assets", (c) => {
  return c.json({
    assets: [
      {
        name: "Resume PDF",
        path: "/assets/Austin_Humphrey_Resume.pdf",
        type: "application/pdf",
      },
    ],
  });
});

// ── Contact ─────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", async (c) => {
  let body: Record<string, unknown>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { name, email, message } = body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return c.json({ error: "Missing required fields: name, email, message" }, 400);
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return c.json({ error: "Fields must be strings" }, 400);
  }

  if (!EMAIL_RE.test(email)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  const id = crypto.randomUUID();

  if (c.env.PORTFOLIO_CONTACTS) {
    await c.env.PORTFOLIO_CONTACTS.put(
      id,
      JSON.stringify({ name, email, message, createdAt: new Date().toISOString() }),
    );
  }

  return c.json({ success: true, id });
});

export default app;
