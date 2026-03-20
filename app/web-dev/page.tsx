import { getEmbeds } from "../actions";

export default async function WebDev() {
  const embeds = await getEmbeds("web-dev");

  return (
    <div className="pt-[72px] min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="px-6 md:px-12 pt-20 pb-14 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
        <p className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-500 mb-6 flex items-center gap-3 before:content-[''] before:inline-block before:w-7 before:h-[1px] before:bg-brand-500 reveal in">
          01 / bankiim_push
        </p>
        <h2 className="font-sans text-[clamp(40px,6vw,72px)] font-light leading-none text-slate-900 dark:text-slate-50 reveal d1 in transition-colors duration-300">
          Selected<br /><em className="italic text-brand-500">Projects</em>
        </h2>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto pb-24 reveal d2 in">
        {embeds.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-[1px] bg-brand-500 mb-8"></div>
            <h3 className="font-sans text-3xl font-light text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              <em className="italic text-brand-500">bankiim_push</em> is currently
            </h3>
            <h2 className="font-sans text-[clamp(40px,5vw,64px)] font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-none mb-6 transition-colors duration-300">
              Under Construction
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md transition-colors duration-300">
              I'm curating my best work for this space. Check back soon for updates.
            </p>
          </div>
        ) : (
          <div className="mt-16 flex flex-col gap-16">
            {embeds.map((embed) => (
              <div key={embed.id} className="w-full relative overflow-hidden rounded-[2px] shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 transition-colors duration-300" dangerouslySetInnerHTML={{ __html: embed.code }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
