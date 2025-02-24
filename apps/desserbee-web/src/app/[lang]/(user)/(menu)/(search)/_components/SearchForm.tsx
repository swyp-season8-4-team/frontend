'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { WithClassName } from '@repo/ui';
// import NavigationService from '@repo/usecase/navigationService';
// import { debounce } from '@repo/ui/util/debounce';
import type { Iconable } from '@repo/design-system/components/icons';
import InputField from '@repo/design-system/components/InputField';

// const navigationService = new NavigationService();

interface Props extends WithClassName {
  icon?: Iconable;
  initialValue?: string;
  placeholder?: string;
}

export default function SearchForm({ className, icon, initialValue, placeholder }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const term = formData.get('search');

    // if (!term || typeof term !== 'string' || term.length === 0) {
    //   return;
    // }

    // startTransition(() => {
    //   debounce({
    //     key: `search-form-keyword-${term}`,
    //     wait: 250,
    //     callback: () => {
    //       router.push(
    //         navigationService.getHref(
    //           SearchResultWebNavigationPathname.SEARCH,
    //           {
    //             term,
    //           },
    //         ),
    //       );
    //     },
    //   });
    // });
  };

  return (
    <form className='flex w-[full]' autoComplete="off" onSubmit={handleSubmit}>
      <InputField
        className={''}
        name="search"
        type="search"
        placeholder={placeholder}
        icon={icon}
        defaultValue={initialValue}
        autoComplete="off"
        disabled={isPending}
      />
    </form>
  );
}
