// import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetState } from '../../redux/slices/userAuthorSlice';
// import './NavBar.css'


// function NavBar() {
//   let { loginUserStatus, currentUser } = useSelector((state) => state.userAuthorLoginReducer);
//   let dispatch = useDispatch();

//   function LogOut() {
//     localStorage.removeItem('token');
//     dispatch(resetState());
//   }

//   const scrollToAbout = () => {
//     const aboutSection = document.getElementById('AboutUs');
//     if (aboutSection) {
//       aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const scrollToContact = () => {
//     const contactSection = document.getElementById('ContactUs');
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   return (
//     <div className="w">
//     <nav className='navbar navbar-expand-lg navbar-light '>
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">
          
//         </NavLink>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             {loginUserStatus === false ? (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link text-white fw-semibold" to='/' style={{ fontSize: '1.7rem' }}>Home</NavLink>
//                 </li>
//                 <li className='nav-item'>
//                   <button className='nav-link ppp text-white fw-semibold' onClick={scrollToAbout} style={{ fontSize: '1.7rem' }}>About Us</button>
//                 </li>
//                 <li className='nav-item'>
//                   <button className='nav-link ppp text-white fw-semibold' onClick={scrollToContact} style={{ fontSize: '1.7rem' }}>Contact Us</button>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link text-white fw-semibold" to='/Register' style={{ fontSize: '1.7rem' }}>Register</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link text-white fw-semibold" to='/Login' style={{ fontSize: '1.7rem' }}>Login</NavLink>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {currentUser.userType === 'author' && (
//                   <>
//                   <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
//                   <li className="nav-item">
//                 <NavLink className="nav-link text-white fw-semibold" to='user-profile/articles-language' style={{ fontSize: '1.5rem',margin:'10px' }}>sort By Languages</NavLink> {/* Add link for articles by languages */}
//               </li>
//                     <li className="nav-item text-white">
//                       <NavLink className="nav-link text-white fw-semibold" to={`author-profile/articles/${currentUser.username}`} style={{ fontSize: '1.5rem' ,margin:'10px'}}> Courses-Byme</NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold" to="author-profile/add-article" style={{ fontSize: '1.5rem',margin:'10px' }}>Add Course</NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold mx-3" to="author-profile/delete" style={{ fontSize: '1.5rem',margin:'10px' }}>Deleted Courses</NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold" to="author-profile/favourites" activeClassName="active" style={{ fontSize: '1.5rem',margin:'10px' }}>Favourites</NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold me-5" to="author-profile/article" activeClassName="active" style={{ fontSize: '1.5rem',margin:'10px' }}>All Courses</NavLink>
//                     </li>
//                     </div>
                    
//                   </>
//                 )}
//                 {currentUser.userType === 'user' && (
//                   <>
//                   <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold" to="user-profile/favourites" style={{ fontSize: '1.7rem',margin:'10px' }}>Favourites</NavLink>
//                     </li>
//                     <li className="nav-item">
//                       <NavLink className="nav-link text-white fw-semibold me-5" to="user-profile/article" style={{ fontSize: '1.7rem',margin:'10px' }}>All Courses</NavLink>
//                     </li>
//                     <li className="nav-item">
//                 <NavLink className="nav-link text-white fw-semibold" to='user-profile/articles-language' style={{ fontSize: '1.7rem',margin:'10px'}}>sort By Languages</NavLink> {/* Add link for articles by languages */}
//               </li>
//                     </div>
//                   </>
//                 )}
//                 <li className="nav-item">
//                   <span className="lead fs-3 ml-5 fw-1" style={{ fontWeight: 'bold', fontSize: '1.7rem', textTransform: 'capitalize', fontFamily: 'fantasy' }}>
//                     {currentUser.username}
//                     <sup style={{ color: 'var(--dark-green)', fontSize: '1rem' }}>({currentUser.userType})</sup>
//                   </span>
//                   <NavLink className="nav-link lead fs-3 me-3 fw-1" to="Login" style={{ color: "var(--light-grey)", fontSize: '1.7rem' }} onClick={LogOut}>
//                     --LogOut
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   </div>
// );
// }

// export default NavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../../redux/slices/userAuthorSlice';
import './NavBar.css';

function NavBar() {
  const { loginUserStatus, currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const dispatch = useDispatch();

  function LogOut() {
    localStorage.removeItem('token');
    dispatch(resetState());
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('AboutUs');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('ContactUs');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w">
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/"></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {loginUserStatus === false ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white fw-semibold" to='/' style={{ fontSize: '2rem' }}>Home</NavLink>
                  </li>
                  {/* <li className='nav-item'>
                    <button className='nav-link ppp text-white fw-semibold' onClick={scrollToAbout} style={{ fontSize: '2rem' }}>About Us</button>
                  </li>
                  <li className='nav-item'>
                    <button className='nav-link ppp text-white fw-semibold' onClick={scrollToContact} style={{ fontSize: '2rem' }}>Contact Us</button>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link text-white fw-semibold" to='/Login' style={{ fontSize: '2rem' }}>Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white fw-semibold" to='/' style={{ fontSize: '2rem' }}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <span className="lead fs-3 ml-5 fw-1" style={{ fontWeight: 'bold', fontSize: '2rem', textTransform: 'capitalize', fontFamily: 'fantasy' }}>
                      {currentUser.username}
                      <sup style={{ color: 'var(--dark-green)', fontSize: '1rem' }}>({currentUser.userType})</sup>
                    </span>
                    <NavLink className="nav-link lead fs-3 me-3 fw-1" to="Login" style={{ color: "var(--light-grey)", fontSize: '2rem' }} onClick={LogOut}>
                      --LogOut
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

