import { Form } from '@/components/Form/Form';
import { useTranslations } from 'next-intl';

export default function IndexPage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Form />
    </div>
  );
}
