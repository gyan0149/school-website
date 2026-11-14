// Bhagwan Birsa Munda, used as the site emblem.
export function Logo({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/birsa-munda-logo.jpg`}
      alt="Bhagwan Birsa Munda"
      title="Bhagwan Birsa Munda"
      width={80}
      height={80}
      className={`rounded-full bg-white object-cover ring-2 ring-accent-500 ${className}`}
    />
  );
}
