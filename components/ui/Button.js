import Link from "next/link";

const variants = {
  primary:
    "bg-gradient-gold text-ink font-semibold shadow-soft hover:brightness-105 focus-gold",
  secondary:
    "border border-graphite/30 bg-white text-ink hover:border-gold hover:text-gold-dark focus-gold",
  ghost: "text-graphite hover:text-gold-dark focus-gold",
  whatsapp:
    "bg-[#25D366] text-white font-semibold hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md transition ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
