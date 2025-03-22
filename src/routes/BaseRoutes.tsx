import { useRoutes } from 'react-router-dom';
import LeadershipRoutes from './LeadershipRoutes';
import TeacherRoutes from './TeacherRoutes';
import StudentRoutes from './StudentRoutes';
import CollegeAndCentreRoutes from './CollegeAndCentreRoutes';
import AuthRoutes from './AuthRoutes';


const BaseRoutes = () => {
  const routes = [...LeadershipRoutes, ...TeacherRoutes, ...StudentRoutes, ...CollegeAndCentreRoutes, ...AuthRoutes];
  return useRoutes(routes);
};

export default BaseRoutes;
