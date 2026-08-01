import "./globals.css";

export const metadata = {
  title: "مشروعي | مشروع تخرجك من الفكرة للمناقشة",
  description:
    "منصة عربية متكاملة تساعد طلاب الجامعات على تخطيط وتنفيذ وتوثيق مشروع التخرج خطوة بخطوة.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
