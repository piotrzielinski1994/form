import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import { ComplexFormNavigation } from '@/components/ComplexFormNavigation';
import { useTranslations } from 'next-intl';

export default function IndexPage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <h1 className="text-5xl text-center">{t('title')}</h1>
      <div className="grid grid-cols-[1fr_auto] gap-10 !items-start">
        <ComplexFormNavigation />
        <ComplexForm />
      </div>
    </>
  );
}
