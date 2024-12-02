// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';

// Import Pages
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import { checkAuthStatus } from './redux/actions/authActions';

// Private Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  console.log('isAuthenticated:', isAuthenticated, 'user:', user);
  
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // if (allowedRoles && !allowedRoles.includes(user?.type)) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/admin/*" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/employee/*" 
          element={
            <PrivateRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';

// // Import Pages
// import Login from './pages/Login';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import EmployeeDashboard from './pages/employee/EmployeeDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Allow access to the Login page */}
//         <Route path="/login" element={<Login />} />
        
//         {/* Allow access to the Admin Dashboard without restrictions */}
//         <Route path="/admin/*" element={<AdminDashboard />} />
        
//         {/* Allow access to the Employee Dashboard without restrictions */}
//         <Route path="/employee/*" element={<EmployeeDashboard />} />
        
//         {/* Redirect to the Login page for the root route */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// function AppWrapper() {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// }

// export default AppWrapper;
