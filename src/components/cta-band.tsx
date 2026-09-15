export function CtaBand({ title, text, cta }: { title: string; text: string; cta: { label: string; href: string } }) {
  return (
    <div className="mx-auto my-16 max-w-[1120px] px-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center text-white">
        <span aria-hidden className="absolute -bottom-24 -left-16 size-56 rounded-full bg-peri opacity-35" />
        <span aria-hidden className="absolute -right-12 -top-16 size-44 rounded-full bg-mint opacity-35" />
        <h2 className="relative text-3xl text-white md:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-3 max-w-lg text-navy-muted">{text}</p>
        <a href={cta.href} className="relative mt-7 inline-block rounded-lg bg-mint px-7 py-3 font-bold text-white hover:bg-mint-600">{cta.label}</a>
      </div>
    </div>
  );
}
