import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Suspense, lazy } from "react"
import './App.css'

import Loading from "./app/(main)/(loading)/Client"
const RootLayout = lazy(() => import("./app/layout"));
const WelcomeLayout = lazy(() => import("./app/(main)/welcome/layout"));
const WelcomePage = lazy(() => import("./app/(main)/welcome/page"));
const ChatLayout = lazy(() => import("./app/(main)/chat/layout"));
const SettingLayout = lazy(() => import('./app/(main)/settings/layout'));
const SettingModal = lazy(() => import('./app/(main)/settings/modal/page'));
const Category = lazy(() => import("./app/(main)/settings/@category/default"));
const SettingCommon = lazy(() => import("./app/(main)/settings/common/page"));
const SettingSystemAgent = lazy(() => import("./app/(main)/settings/system-agent/page"));
const SettingSync = lazy(() => import("./app/(main)/settings/sync/page"));
const SettingLLM = lazy(() => import("./app/(main)/settings/llm/page"));
const SettingTTS = lazy(() => import("./app/(main)/settings/tts/page"));
const SettingAgent = lazy(() => import("./app/(main)/settings/agent/page"));
const SettingAbout = lazy(() => import("./app/(main)/settings/about/page"));
const MarketLayout = lazy(() => import('./app/(main)/market/layout'));
const MarketPage = lazy(() => import('./app/(main)/market/page'));
const Auth = lazy(() => import('./app/auth/page'));
const MeLayout = lazy(() => import('@/app/(main)/(mobile)/me/(home)/layout'));
const MePage = lazy(() => import('@/app/(main)/(mobile)/me/(home)/page'));
const MeDataLayout = lazy(() => import('@/app/(main)/(mobile)/me/data/layout'));
const MeDataPage = lazy(() => import('@/app/(main)/(mobile)/me/data/page'));
const MainLayout = lazy(() => import("./app/(main)/layout"));

const router = createBrowserRouter([
  {
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: '/me',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <MeLayout>
            <MePage />
          </MeLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/me/data',
        element:
          <Suspense fallback={<Loading />}><MainLayout>
            <MeDataLayout>
              <MeDataPage />
            </MeDataLayout>
          </MainLayout>
          </Suspense>
      },
      {
        path: '',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <WelcomeLayout>
            <WelcomePage />
          </WelcomeLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: 'market',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <MarketLayout>
            <MarketPage></MarketPage>
          </MarketLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: 'chat',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <ChatLayout>
          </ChatLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/modal',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingModal />
          </SettingLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/common',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingCommon />
          </SettingLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/system-agent',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingSystemAgent />
          </SettingLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/sync',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingSync />
          </SettingLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/llm',
        element: <Suspense fallback={<Loading />}><MainLayout>
          <SettingLayout category={<Category></Category>}>
            <SettingLLM />
          </SettingLayout>
        </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/tts',
        element: <Suspense fallback={<Loading />}><MainLayout>
        <SettingLayout category={<Category></Category>}>
          <SettingTTS />
        </SettingLayout>
      </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/agent',
        element: <Suspense fallback={<Loading />}><MainLayout>
        <SettingLayout category={<Category></Category>}>
          <SettingAgent />
        </SettingLayout>
      </MainLayout>
        </Suspense>
      },
      {
        path: '/settings/about',
        element: <Suspense fallback={<Loading />}><MainLayout>
        <SettingLayout category={<Category></Category>}>
          <SettingAbout />
        </SettingLayout>
      </MainLayout>
        </Suspense>
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
