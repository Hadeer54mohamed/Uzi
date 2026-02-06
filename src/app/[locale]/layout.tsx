import { Cairo, El_Messiri } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Script from "next/script";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-cairo",
});

const elMessiri = El_Messiri({
  subsets: ["latin", "arabic"],
  display: "swap",
  variable: "--font-el-messiri",
});

export const metadata = {
  title: "UzerSaif | Tour",
  description: "Tour",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${cairo.variable} ${elMessiri.variable}`}>
      <head>
        <style>{`
          /* Cairo for body text */
          .font-sans, .font-body {
            font-family: var(--font-cairo), 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif !important;
          }
          /* El Messiri for headings */
          h1, h2, h3, h4, h5, h6, .font-heading {
            font-family: var(--font-el-messiri), 'El Messiri', Arial, sans-serif !important;
          }
          /* Badges - عناصر عندها border و backdrop-blur */
          span[class*="backdrop-blur"],
          span[class*="border"],
          span[class*="rounded-full"][class*="border"],
          div[class*="backdrop-blur"] > h1,
          div[class*="backdrop-blur"] > h2,
          div[class*="backdrop-blur"] > h3,
          div[class*="backdrop-blur"] > span,
          div[class*="border"][class*="rounded"] > h1,
          div[class*="border"][class*="rounded"] > h2,
          div[class*="border"][class*="rounded"] > h3,
          div[class*="border"][class*="rounded"] > span {
            font-family: var(--font-el-messiri), 'El Messiri', Arial, sans-serif !important;
          }
        `}</style>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1420955529825301');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v6lurda27g");
            `,
          }}
        />
      </head>
      <body
        className={`${cairo.className} ${cairo.variable} ${elMessiri.variable} antialiased`}
      >
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1420955529825301&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <NextIntlClientProvider messages={messages}>
          {children}
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
