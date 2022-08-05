import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import config from '../../main.config'
import { forgotHandler, resetHandler } from '../../helpers/handlers'

export default function () {
    const title = 'Reset Password'
    const description =
        'Reset your password using the verification code sent to your email address.'

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    return (
        <>
            <Layout
                config={config}
                themePreference={themePreference}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
            >
                <Grid.Container gap={1}>
                    <Grid xs={24}>
                        <Input
                            width="300pt"
                            label="email"
                            placeholder="Input your email address."
                            type="secondary"
                            value={email}
                            disabled={nextStage}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </Grid>
                    {!nextStage && (
                        <Grid xs={24}>
                            <Button
                                width="300pt"
                                loading={loading}
                                type="secondary"
                                onClick={(e) =>
                                    forgotHandler(
                                        config,
                                        refEmail,
                                        setLoading,
                                        setToast,
                                        setNextStage
                                    )
                                }
                            >
                                <b>SUBMIT EMAIL</b>
                            </Button>
                        </Grid>
                    )}
                    {nextStage && (
                        <>
                            <Grid xs={24}>
                                <Input
                                    width="300pt"
                                    label="code"
                                    placeholder="Input your verification code."
                                    type="secondary"
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid xs={24}>
                                <Input
                                    width="300pt"
                                    label="password"
                                    placeholder="Input your new password."
                                    type="secondary"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid xs={24}>
                                <Button
                                    width="300pt"
                                    loading={loading}
                                    type="secondary"
                                    onClick={(e) =>
                                        resetHandler(
                                            config,
                                            refCode,
                                            refPassword,
                                            setLoading,
                                            setToast,
                                            router
                                        )
                                    }
                                >
                                    <b>SUBMIT NEW PASSWORD</b>
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid.Container>
            </Layout>
        </>
    )
}