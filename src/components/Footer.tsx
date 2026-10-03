import { nav, site } from "@/content/site";
import { EMAIL, PHONE_DISPLAY, SOCIAL, mailHref, telHref, whatsappHref } from "@/content/owner";

export function Footer() {
  const wa = whatsappHref();
  const tel = telHref();
  const mail = mailHref();
  const hasContact = Boolean(wa || tel || mail);

  return (
    <footer className="on-dark bg-green-900 text-ivory">
      <div className="shell grid12 gap-y-14 py-20 lg:py-24">
        <div className="col-span-full lg:col-span-4">
          <p className="t-sub leading-[1.2]">
            {site.wordmark[0]}
            <br />
            {site.wordmark[1]}
          </p>
          <p className="t-plate mt-6">{site.region}</p>
        </div>

        <nav
          aria-label="Footer"
          className="col-span-full sm:col-span-6 lg:col-span-3 lg:col-start-7"
        >
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link tap t-plate">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Only channels that actually exist. */}
        {(hasContact || SOCIAL.length > 0) && (
          <div className="col-span-full sm:col-span-6 lg:col-span-3 lg:col-start-10">
            <ul>
              {tel && (
                <li>
                  <a href={tel} className="link tap t-plate">
                    {PHONE_DISPLAY}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link tap t-plate"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {mail && (
                <li>
                  <a href={mail} className="link tap t-plate">
                    {EMAIL}
                  </a>
                </li>
              )}
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link tap t-plate"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="shell flex flex-col gap-2 border-t border-[var(--rule-dark)] py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-plate">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="t-plate">Wayanad · Kerala · India</p>
      </div>
    </footer>
  );
}
