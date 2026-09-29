import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { formatLKR, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:rounded-xl">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="size-3 fill-primary text-primary" aria-hidden />
          <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        <h3 className="mt-1.5 line-clamp-2 min-h-9 text-xs font-semibold leading-snug sm:text-sm">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-sm font-bold text-foreground sm:text-base">
              {formatLKR(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatLKR(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-1.5 sm:mt-3 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                add(product.slug);
                navigate({ to: "/checkout" });
              }}
              className="min-h-10 rounded-md bg-primary px-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary-dark sm:rounded-full sm:px-3"
            >
              Buy now
            </button>
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => add(product.slug)}
              className="grid size-10 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary sm:rounded-full"
            >
              <ShoppingCart className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
