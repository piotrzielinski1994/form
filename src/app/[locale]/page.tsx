import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import { useTranslations } from 'next-intl';

export default function IndexPage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <h1 className="text-5xl text-center">{t('title')}</h1>
      <ComplexForm />
    </>
  );
}
