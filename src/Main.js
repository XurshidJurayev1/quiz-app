import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useEffect, useState } from 'react';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './form/Login';
import { connect } from 'react-redux';
import { getCourses } from './action';

const Main = (props) => {
  const [admin, setAdmin] = useState(false);


  const func = () => {
    if (props.role.length > 0) {
      switch (props.role[0]) {
        case 'ADMIN'  :
          return setAdmin(true);
        case 'TEACHER' :
          return setAdmin(true);
        default:
          return null;
      }
    } else {
      return null;
    }

  };

  useEffect(() => {
    func();
    console.log(props);
    props.getCourses();

  }, [props.role]);


  return (<div>
    <BrowserRouter>
      <Routes>

        {admin && <Route path="/admin/*">
          <Route index element={<App />} />
          <Route path="*" element={<App />} />
        </Route>
        }

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1 className="text-center">Hello User !!!</h1>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>

  </div>);
};

const mapStateToProps = (state) => {
  return {
    role: state.role, token: state.token,
    courses: state.getCourses,
  };
};

export default connect(mapStateToProps, { getCourses })(Main);