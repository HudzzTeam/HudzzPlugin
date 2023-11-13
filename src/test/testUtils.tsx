import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { InitialEntry, MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
import { Route, Router, Routes } from "react-router-dom";
import type { Cache, SWRConfiguration } from "swr";
import { SWRConfig } from "swr";

export const cache = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ThemeModeProvider({ children }: any) {
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>;
}

export interface ProviderOptions extends RenderOptions {
  initialEntries?: Array<InitialEntry>;
  route?: string;
  swrConfig?: SWRConfiguration;
}

interface ProvidersProps extends ProviderOptions {
  children: React.ReactNode;
  history: MemoryHistory;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  swrCache: Cache<any>;
}

function Providers({ children, history, route, swrCache }: ProvidersProps) {
  let Wrapper = (
    <Suspense fallback={null}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SWRConfig
          value={{
            dedupingInterval: 0,
            errorRetryCount: 0,
            fetcher: undefined,
            provider: () => swrCache,
            revalidateOnFocus: false,
          }}
        >
          <ThemeModeProvider>
            <SnackbarProvider autoHideDuration={20} maxSnack={1}>
              {children}
            </SnackbarProvider>
          </ThemeModeProvider>
        </SWRConfig>
      </LocalizationProvider>
    </Suspense>
  );

  if (route) {
    Wrapper = (
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route element={Wrapper} path={route} />
        </Routes>
      </Router>
    );
  }

  return Wrapper;
}

function renderWithProviders(ui: React.ReactElement, options: ProviderOptions = {}) {
  const { initialEntries = [], route, ...rest } = options;
  const history = createMemoryHistory({ initialEntries });
  const swrCache = new Map(cache);

  const rtl = render(ui, {
    wrapper: ({ children }) => (
      <Providers history={history} route={route} swrCache={swrCache}>
        {children}
      </Providers>
    ),
    ...rest,
  });

  return {
    ...rtl,
    history,
    rerender: (ui: React.ReactElement, rerenderOptions?: ProviderOptions) =>
      renderWithProviders(ui, {
        container: rtl.container,
        ...options,
        ...rerenderOptions,
      }),
    swrCache,
  };
}

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

export { screen } from "@testing-library/react";

export { renderWithProviders as render, setup, userEvent as user };
