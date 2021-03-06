import * as React from 'react'
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import { InstallMessage } from 'components/install-message'
import { Router } from 'components/router'
import { ThemeProvider } from 'components/theme-provider'
import { UpdateSnackbar } from 'components/update-snackbar'
import { LocalStorageProvider } from 'contexts/local-storage-context'
import { LocalizationProvider } from 'localization'
import { GlobalStyle } from 'styles/global'
import { THEME } from 'styles/theme'

const queryConfig: ReactQueryConfig = {
  mutations: { useErrorBoundary: true },
  shared: { suspense: true },
  queries: {
    useErrorBoundary: true,
    staleTime: 60 * 1000, // Fetched data will be fresh for 1 minute befor becoming stale
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  },
}

export function App() {
  return (
    <LocalizationProvider>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <LocalStorageProvider>
          <ReactQueryConfigProvider config={queryConfig}>
            <Router />
            <InstallMessage />
            <UpdateSnackbar />
          </ReactQueryConfigProvider>
        </LocalStorageProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </LocalizationProvider>
  )
}
