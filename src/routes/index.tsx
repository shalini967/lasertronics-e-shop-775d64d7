import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Headphones, Wrench, Cpu, Tv, Smartphone, CircuitBoard } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { CategoryRail } from "@/components/home/CategoryRail";
import { categories } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lasertronics PVT LTD | Electronics, IoT & Repair Store in Sri Lanka" },
      {
        name: "description",
        content:
          "Shop mobile accessories, electronic components, TV accessories, IoT boards and repair kits in Sri Lanka. Genuine stock, LKR pricing, island-wide delivery.",
      },
      { property: "og:title", content: "Lasertronics PVT LTD | Electronics Store Sri Lanka" },
      {
        property: "og:description",
        content:
          "Components, accessories and bench tools for makers, technicians and businesses across Sri Lanka.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = [Smartphone, CircuitBoard, Tv, Cpu, Wrench];

const perks = [
  { icon: Truck, title: "Island-wide delivery", copy: "Dispatched from Colombo within 24 hours." },
  { icon: ShieldCheck, title: "Genuine warranty", copy: "Every product covered and locally serviced." },
  { icon: Headphones, title: "Engineer support", copy: "Talk to people who actually build things." },
];

const solutions = [
  {
    title: "Education & labs",
    copy: "Class-set kits, dev boards and consumables for university and school electronics labs.",
  },
  {
    title: "Service centres",
    copy: "Rework stations, ESD tooling and spare consumables stocked for daily bench workloads.",
  },
  {
    title: "Industrial IoT",
    copy: "Sensor nodes, gateways and power modules for monitoring deployments across the island.",
  },
];

function Index() {
  return (
    <SiteLayout>
      <Hero />

      {/* Perks */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-4 py-6 sm:grid-cols-3 sm:gap-5 sm:py-8">
          {perks.map((p) => (
            <div key={p.title} className="flex min-w-0 items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary">
                <p.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold">{p.title}</span>
                <span className="block text-xs text-muted-foreground">{p.copy}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Category tiles */}
      <section className="container-page py-9 lg:py-16">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Shop by category</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Five focused ranges, curated for Sri Lankan makers, technicians and households.
        </p>
        <div className="no-scrollbar -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-5">
          {categories.map((c, i) => {
            const Icon = icons[i] ?? Cpu;
            return (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group flex w-36 shrink-0 snap-start flex-col rounded-md border border-border bg-surface p-3 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift sm:w-auto sm:rounded-xl sm:p-4"
              >
                <span className="grid size-11 place-items-center rounded-full bg-accent text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="mt-3 text-sm font-bold leading-snug">{c.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{c.tagline}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                  Explore <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {categories.map((c) => (
        <CategoryRail key={c.slug} category={c} />
      ))}

      {/* Dark solutions band */}
      <section className="bg-ink py-16 text-ink-foreground lg:py-20">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Solutions</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            From a single sensor to a full deployment
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Lasertronics supplies and supports electronics projects end to end — sourcing, bulk
            pricing and technical guidance from a team that works on benches every day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-ink-muted/20 bg-ink-foreground/5 p-5 transition-colors hover:border-primary"
              >
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.copy}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Talk to our team <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
