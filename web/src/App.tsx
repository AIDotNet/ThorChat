import { Route, RouterProvider, createBrowserRouter } from "react-router-dom"
import './App.css'
import { ThemeProvider } from "@lobehub/ui"
import RootLayout from "./app/layout"
import WelcomeLayout from "./app/(main)/welcome/layout"
import WelcomePage from "./app/(main)/welcome/page"
import MainLayout from "./app/(main)/layout"
import ChatLayout from "./app/(main)/chat/layout"
import SettingLayout from './app/(main)/settings/layout'
import SettingModla from './app/(main)/settings/modal/page'
import Category from "./app/(main)/settings/@category/default"
import SettingCommon from "./app/(main)/settings/common/page"
import SettingSystemAgent from "./app/(main)/settings/system-agent/page"
import SettingSync from "./app/(main)/settings/sync/page"
import SettingLLM from "./app/(main)/settings/llm/page"
import SettingTTS from "./app/(main)/settings/tts/page"
import SettingAgent from "./app/(main)/settings/agent/page"
import SettingAbout from "./app/(main)/settings/about/page"
import MarketLayout from './app/(main)/market/layout'
import MarketPage from './app/(main)/market/page'
import Auth from './app/auth/page'

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0].includes('A component suspended while responding to synchronous input')) {
    return;
  }
  // originalConsoleError(...args);
};

const router = createBrowserRouter([
  {
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: '',
        element: <MainLayout>
          <WelcomeLayout>
            <WelcomePage />
          </WelcomeLayout>
        </MainLayout>
      },
      {
        path: 'market',
        element: <MainLayout>
          <MarketLayout>
            <MarketPage></MarketPage>
          </MarketLayout>
        </MainLayout>
      },
      {
        path: 'chat',
        element: <MainLayout>
          <ChatLayout>
          </ChatLayout>
        </MainLayout>
      },
      {
        path: '/settings/modal',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingModla />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/common',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingCommon />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/system-agent',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingSystemAgent />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/sync',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingSync />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/llm',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingLLM />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/tts',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingTTS />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/agent',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingAgent />
          </SettingLayout>
        </MainLayout>
      },
      {
        path: '/settings/about',
        element: <MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingAbout />
          </SettingLayout>
        </MainLayout>
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
