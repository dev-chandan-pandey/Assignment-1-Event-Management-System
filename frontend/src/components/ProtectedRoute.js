// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const token = localStorage.getItem('token');
    
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 token ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to="/login" />
//                 )
//             }
//         />
//     );
// };

// export default ProtectedRoute;
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     const isAuthenticated =localStorage.getItem('token'); /* logic to check if user is authenticated */;

//     return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');

//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
