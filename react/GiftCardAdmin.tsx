import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Layout, PageBlock } from 'vtex.styleguide'

import AccountProvider from './Provider/accountProvider'
import { pageblock } from './utils/definedMessages'
import ConfigurationComponent from './components/configurationComponent'

const GiftCardAdmin: FC = () => {
  const intl = useIntl()

  return (
    <AccountProvider>
      <Layout>
        <PageBlock title={intl.formatMessage(pageblock.title)} variation="full">
          <ConfigurationComponent />
        </PageBlock>
      </Layout>
    </AccountProvider>
  )
}

export default GiftCardAdmin
