import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Landing,  Error, Register, ProtectedRoute } from "./pages";
import {AllFeatures, AddFeature} from '../src/components';


import { 
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
  FormLayout,
  AllProjects

} from './pages/dashboard';
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='add-project' element={<FormLayout />} />
          <Route path='all-projects' element={<AllProjects />} />
          <Route
            path='add-feature'
            element={<AddFeature  />}
          />
          <Route path='all-features' element={<AllFeatures />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
