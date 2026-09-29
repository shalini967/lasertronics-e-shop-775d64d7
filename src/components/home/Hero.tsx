import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "IoT & Microcontrollers",
    title: "Build connected things, faster",
    copy: "Dev boards, sensors and starter kits stocked in Colombo and shipped island-wide.",
    to: "/category/$slug",
    slug: "iot-and-microcontrollers",
    cta: "Shop dev boards",
  },
  {
    image: hero2,
    eyebrow: "Mobile Accessories",
    title: "Power that keeps up with you",
    copy: "GaN chargers, 100W cables and magnetic power banks built for everyday punishment.",
    to: "/category/$slug",
    slug: "mobile-accessories",
    cta: "Shop accessories",
    light: true,
  },
  {
    image: hero3,
    eyebrow: "Repair Kits",
    title: "Bench-grade tools for real work",
    copy: "Soldering stations, ESD-safe kits and precision drivers trusted by service centres.",
    to: "/category/$slug",
    slug: "repair-kits",
    cta: "Shop repair tools",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index]!;
  const light = Boolean((slide as { light?: boolean }).light);

  return (
    <section className={`relative isolate overflow-hidden ${light ? "bg-muted" : "bg-ink"}`}>
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt=""
          aria-hidden={i !== index}
          width={1600}
          height={900}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
            i === index ? (light ? "opacity-40" : "opacity-70") : "opacity-0"
          }`}
        />
      ))}
      <div
        className={
          light
            ? "absolute inset-0 bg-gradient-to-r from-muted via-muted/85 to-muted/40"
            : "absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
        }
      />

      <div className="container-page relative flex min-h-[22rem] flex-col justify-center py-10 sm:min-h-[30rem] sm:py-16 lg:min-h-[34rem] lg:py-24">
        <div key={index} className="max-w-xl animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {slide.eyebrow}
          </p>
          <h1
            className={`mt-3 max-w-[18rem] text-3xl font-extrabold leading-tight sm:max-w-xl sm:text-4xl lg:text-5xl ${
              light ? "text-foreground" : "text-ink-foreground"
            }`}
          >
            {slide.title}
          </h1>
          <p
            className={`mt-4 max-w-md text-sm leading-relaxed sm:text-base ${
              light ? "text-muted-foreground" : "text-ink-muted"
            }`}
          >
            {slide.copy}
          </p>
          <div className="mt-6 grid max-w-sm grid-cols-2 gap-2 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
            <Link
              to="/category/$slug"
              params={{ slug: slide.slug }}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-center text-xs font-bold text-primary-foreground transition-colors hover:bg-primary-dark sm:min-h-12 sm:rounded-full sm:px-6 sm:text-sm"
            >
              {slide.cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/shop"
              className={`inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-center text-xs font-bold transition-colors hover:border-primary hover:text-primary sm:min-h-12 sm:rounded-full sm:px-6 sm:text-sm ${
                light
                  ? "border-border text-foreground"
                  : "border-ink-muted/40 text-ink-foreground"
              }`}
            >
              Browse all products
            </Link>
          </div>
        </div>

        <div className="mt-7 flex gap-2 sm:mt-10">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-10 bg-primary"
                  : light
                    ? "w-5 bg-foreground/20"
                    : "w-5 bg-ink-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
