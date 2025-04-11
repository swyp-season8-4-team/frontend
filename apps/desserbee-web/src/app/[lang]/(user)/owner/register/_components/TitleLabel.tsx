interface TitleLabelProps {
  title: string;
  isPrimary?: boolean;
  description?: string;
}

export function TitleLabel({ title, isPrimary, description }: TitleLabelProps) {
  return (
    <label className="flex flex-col gap-[5px]">
      <div className="flex items-center gap-1">
        <div className="text-neutral-30 text-base font-medium">{title}</div>
        {isPrimary && <div className="text-error-60 text-sm">*</div>}
      </div>
      {description && (
        <div className="text-neutral-40 text-xs">{description}</div>
      )}
    </label>
  );
}
