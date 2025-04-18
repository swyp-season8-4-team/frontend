import IconWarn from '@repo/design-system/components/icons/IconWarn';
interface ValidationErrorProps {
  errorMessage: string | undefined;
}
export function ValidationError({ errorMessage }: ValidationErrorProps) {
  return (
    <div className="text-error-60 flex items-center gap-[5px] whitespace-nowrap text-xs">
      <div className="h-3 w-3 flex-shrink-0">
        <IconWarn className="h-full w-full" />
      </div>
      <span>{errorMessage}</span>
    </div>
  );
}
