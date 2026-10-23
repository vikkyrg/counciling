import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

const DETAIL_ICONS = {
  audience: ["person", "users", "teen", "family", "briefcase"],
  focus: ["chat", "shield", "check", "calendar", "spark"],
  benefits: ["spark", "heart", "badge", "leaf", "check"],
};

function DetailList({ heading, items, iconSet }) {
  return (
    <section className="min-w-0 border-t border-[#E8EEE2] pt-4 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-bold leading-tight text-[#36591B]">
        {heading}
      </h4>
      <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.55] text-[#657164] sm:text-base sm:leading-[1.6]">
        {items.map((item, index) => (
          <li key={item} className="flex min-w-0 items-start gap-2.5">
            <Icon
              name={iconSet[index % iconSet.length]}
              className="mt-1 h-4 w-4 shrink-0 text-[#4B7F24]"
            />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ServiceDetailCard({ service }) {
  const bookHref = `/contact?service=${encodeURIComponent(service.title)}`;

  return (
    <article
      id={service.id}
      className="group flex flex-col scroll-mt-28 rounded-[22px] border border-[#DDE8D3] bg-gradient-to-br from-white to-[#FCFDF9] p-6 shadow-[0_4px_14px_rgba(32,59,43,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFD1B2] hover:shadow-[0_10px_24px_rgba(32,59,43,0.085)] sm:p-6 lg:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF1E3] text-[#36591B] transition-colors duration-300 group-hover:bg-[#DCE9D1]">
          <Icon name={service.icon} className="h-[22px] w-[22px]" />
        </span>
        <h3 className="text-base font-bold leading-snug tracking-tight text-[#203B2B] sm:text-lg">
          {service.title}
        </h3>
      </div>

      <p className="mt-3 text-xs leading-[1.5] text-[#687568] sm:text-[13px]">
        {service.description}
      </p>

      <div className="mt-5 space-y-4">
        <DetailList
          heading="Who it's for"
          items={service.forWho}
          iconSet={DETAIL_ICONS.audience}
        />
        <DetailList
          heading="What you'll work on"
          items={service.workOn}
          iconSet={DETAIL_ICONS.focus}
        />
        <DetailList
          heading="Benefits"
          items={service.benefits}
          iconSet={DETAIL_ICONS.benefits}
        />
      </div>

      <div className="mt-5">
        <Button
          to={bookHref}
          variant="secondary"
          size="sm"
          className="w-full justify-center rounded-full border-[#AFC69F] bg-transparent px-4 py-3 text-sm text-[#294B2C] transition-colors hover:border-[#7FA158] hover:bg-[#F2F6EC]"
        >
          Book This Service
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
      </div>
    </article>
  );
}
