import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { PageRoutes } from 'config/page-routes'
import { history } from 'utilities/history'
import { useAuthentication } from 'utilities/use-authentication'
import { useStoredToken } from 'utilities/use-stored-token'
import { useUser } from 'utilities/use-user'

interface IProps extends RouteProps {
  component?: React.ComponentType
}

export const PrivateRouteContainer: React.FC<IProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const { isLoggedIn } = useAuthentication()

  // Fetch status of logged in user
  const storedToken = useStoredToken()
  const { status } = useUser({ id: storedToken.storage?.id })

  const renderRoute = React.useCallback(() => {
    if (!isLoggedIn) {
      // Not authorized redirect to login page with the return url
      return (
        <Redirect
          to={{
            pathname: PageRoutes.Authenticate.path,
            state: { from: history.location.pathname },
          }}
        />
      )
    }

    if (status === 'success') {
      // authorized and user received so return component
      return Component ? <Component /> : children
    }

    if (status === 'loading') {
      return <span>Is fetching user</span>
    }
    if (status === 'error') {
      return <span>Could not fetch user</span>
    }

    throw Error(
      'No user fetched, please make sure that user is fetching or has been fetch beforer navigating using private route.'
    )
  }, [Component, children, isLoggedIn, status])
  return <Route {...rest} render={renderRoute} />
}
