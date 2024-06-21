import React from 'react';
import { Html, Button, Head, Body, Text } from '@react-email/components';

export function TradingEmailLicense({ licenseKey }: { licenseKey: string }) {
  return (
    <Html lang="en">
      <Head>Your license key:</Head>
      <Body>
        <Text children={licenseKey} />
      </Body>
    </Html>
  );
}
