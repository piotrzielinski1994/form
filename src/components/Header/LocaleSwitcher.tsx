'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import clsx from 'clsx';
import { Locale, useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <select
        className="inline-flex appearance-none bg-transparent py-1 px-2 cursor-pointer text-end"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </option>
        ))}
      </select>
    </label>
  );
}
