import { Typography } from '@material-ui/core'
import * as React from 'react'
import ContainedButton from 'components/contained-button'
import { Page } from 'components/page'
import history from 'utilities/history'

export const NotFoundPageView: React.FC = () => {
  return (
    <Page iOSStatusbarColor="black">
      <Typography variant="h1">Page not found</Typography>
      <ContainedButton onClick={() => history.goBack()}>Go back</ContainedButton>
    </Page>
  )
}
