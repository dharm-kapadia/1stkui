import { useRoutes } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  //  return useRoutes([LoginRoutes, MainRoutes]);
  return useRoutes([MainRoutes]);
}
