import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {AuthenLayout} from './Layouts';
import { publicRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = AuthenLayout
              const Page = route.element

              return <Route key={index} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                }/>
            })}
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
