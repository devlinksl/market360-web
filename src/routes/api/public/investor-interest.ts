import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  investorType: z.enum(["Angel", "VC", "Institution", "Strategic Partner", "Individual", "Other"]),
  country: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(4).max(40),
  amount: z.string().trim().min(1).max(80),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  agree: z.boolean().refine((v) => v === true, "Agreement required"),
});

export const Route = createFileRoute("/api/public/investor-interest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ ok: false, error: "Validation failed", issues: parsed.error.flatten() }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }
        // Persistent storage requires Lovable Cloud. For now, log server-side.
        console.log("[investor-interest]", {
          received_at: new Date().toISOString(),
          ...parsed.data,
        });
        return new Response(
          JSON.stringify({
            ok: true,
            message: "Thank you. Our Investor Relations team will be in touch within 2 business days.",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
