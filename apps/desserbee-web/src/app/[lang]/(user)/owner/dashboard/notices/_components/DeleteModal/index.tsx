import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';

interface modalProps {
  open: boolean;
  content: string;
  onCancel:() => void;
  onConfirm:() => void;
}
export default function DeleteModal({ open, content,onCancel,onConfirm }: modalProps) {
  if(!open)
    return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex w-[320px] flex-col items-center rounded-xl bg-white px-6 py-7 shadow-lg">
        <h2 className="mb-7 text-lg font-medium text-gray-900">{content}</h2>
        <div className="flex w-full gap-2">
          <LightOliveButton
            type="button"
            className="font-semibold"
            text="취소"
            onClick={onCancel}
          />
          <OliveButton type="submit" className="font-semibold" text="삭제" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
