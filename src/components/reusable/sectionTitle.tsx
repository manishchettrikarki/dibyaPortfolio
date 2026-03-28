interface SectionTitleProps {
  title: string;
  bgText?: string;
}

export function SectionTitle({ title, bgText }: SectionTitleProps) {
  return (
    <div className="section-title">
      {bgText && <span className="section-title__bg">{bgText}</span>}
      <h2 className="section-title__text">{title}</h2>
      <div className="section-title__line" />
    </div>
  );
}
