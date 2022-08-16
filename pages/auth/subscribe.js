import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { subscribeHandler } from '../../helpers/handlers/authHandlers'
import { isLocaleRTL } from '../../helpers/RTL'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()
    const { setToast } = useToasts()

    const folio = i18n['auth']['subscribe']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [loading, setLoading] = useState(false)

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                useThemeProvider={useThemeProvider}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
            >
                <Grid.Container gap={1} className="avanti">
                    <Grid xs={24}>
                        <Button
                            disabled={!auth}
                            loading={loading}
                            type="secondary"
                            onClick={(e) =>
                                subscribeHandler(
                                    config,
                                    setLoading,
                                    setToast,
                                    i18n['toasts']['subscribe'][locale]
                                )
                            }
                        >
                            {title}
                        </Button>
                    </Grid>
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    .avanti > .item {
                        justify-content: ${isLocaleRTL(locale)
                            ? 'end'
                            : 'start'};
                    }
                `}
            </style>
        </>
    )
}