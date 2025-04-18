import { ComplexForm } from '@/components/ComplexForm/ComplexForm';
import { ComplexFormNavigation } from '@/components/ComplexFormNavigation';
import { getTranslations } from 'next-intl/server';

const HomePage = async () => {
  const t = await getTranslations('HomePage');
  return (
    <>
      <h1 className="text-5xl text-center">{t('title')}</h1>
      <div className="grid grid-cols-[auto_1fr] gap-10 !items-start">
        <ComplexFormNavigation />
        <ComplexForm />
      </div>
    </>
  );
};

export default HomePage;
