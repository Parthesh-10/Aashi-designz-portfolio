export const metadata = {
  title: 'Services | Aashidesignz',
  description: 'Design Services - Brand Design, UI/UX, Graphic Design, Strategy',
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="service-page-layout">
      {children}
    </div>
  );
}
