import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'
import { Layout, PageBlock, ToastProvider } from 'vtex.styleguide'

import Provider from './Provider/provider'
import { pageblock } from './utils/definedMessages'
import ConfigurationComponent from './components/configurationComponent'

const GiftCardAdmin: FC = () => {
  const intl = useIntl()

  return (
    <ToastProvider positioning="window">
      <Provider>
        <Layout>
          <PageBlock
            title={intl.formatMessage(pageblock.title)}
            variation="full"
          >
            <ConfigurationComponent />
          </PageBlock>
        </Layout>
      </Provider>
    </ToastProvider>
  )
}

export default GiftCardAdmin
