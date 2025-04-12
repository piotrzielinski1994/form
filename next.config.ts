import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  turbopack: {},
};

export default withNextIntl(config);
