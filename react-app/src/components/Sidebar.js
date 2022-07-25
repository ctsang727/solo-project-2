import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProjectForm from './Projects/AddProjectForm';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import { getAllProjectsThunk } from '../store/project';
import Modal2 from './Modal2/modal2';




const navLinkStyle = {
  textDecoration: 'none',
  // color: 'white',
  margin: '10px'

}

const Sidebar = ( { toggleTheme, theme } ) => {
  const dispatch = useDispatch()




  const [projects, setProjects] = useState([])

  const userId = useSelector(state => state.session.user?.id)
  const projectsObj = useSelector(state => state?.projects)
  //const projectsArr = Object.values(projectsObj)
  
  // console.log('projectsObj', projectsObj)
  // console.log('projectsArr', projectsArr)
  // console.log('\n\n', projects)
  useEffect(() => {
    dispatch(getAllProjectsThunk(userId))
  }, [dispatch, userId, ])

  useEffect(() => {
    
    setProjects(Object.values(projectsObj))
  }, [projectsObj, setProjects])



  const isProject = (array) => {
    const filterProject = []
    projects.forEach(project => {
      if (project?.project_name) {
        filterProject.push(project)
      }

    })
    return filterProject
  }



  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
    {userId &&
    <div className='sidebar-container'>
      <div id='today-side-div'>
        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/app'>
            <i style={{ color: '#5297ff' }} className="fa-solid fa-note-sticky"></i> Inbox
          </NavLink>
        </div>

        <div className='navlink-div'>
          <NavLink style={navLinkStyle} to='/app/today' >
            <i style={{ color: '#25b84c' }} className="fa-solid fa-calendar"></i> Today
          </NavLink>
        </div>
        <div className='navlink-div'>
          {/* <NavLink style={navLinkStyle} to='/upcoming' >
            <i style={{ color: '#a970ff' }} className="fa-solid fa-calendar-days"></i> Upcoming
          </NavLink> */}
        </div>
      </div>

      <div id='projects-side-div'>
        <div id='projects-header'>
          <div id='projects-text'>
            <h3 style={{paddingRight:'3px'}}>Projects</h3>
          </div>
          {userId && 
          <div id='project-button' >
            
            <i onClick={() => setIsOpen(true)} style={{ fontSize: '18px'}} className="material-icons">add</i>
            <Modal2 theme={theme} open={isOpen} setisOpen={setIsOpen} onClose={e => { e.stopPropagation(); setIsOpen(false) }}>
              <AddProjectForm onClose={e => { e.stopPropagation(); setIsOpen(false) }} theme={theme}></AddProjectForm>
            </Modal2>
            
          </div>
          }
        </div>

        
          <div id='current-projects'>
            {isProject(projects).map(project =>
              <div className='one-project' key={project.id}>
                <NavLink style={navLinkStyle} to={`/app/projects/${project.id}`}><i style={{ margin: '10px', color: `${project.color}` }} class="fa-solid fa-circle"></i>{project.project_name}</NavLink>
              </div>)

            }
          </div>
        

      </div>
      <div></div>

    </div>
  }
  </>
  );
};

export default Sidebar