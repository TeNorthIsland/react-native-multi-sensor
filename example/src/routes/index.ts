// import AudioVideo from '../modules/AudioVideo';
// import AudioVideo from '../components/Camera';
import AudioVideo from '../components/Video';
import FeatureList from '../modules/FeatureList';
import GPS from '../modules/Gps';
import Shock from '../modules/Shock';
import Wifi from '../modules/Wifi';

interface InterRouterItem {
  name: string;
  component: any;
}

//  全部平铺
const routers: Array<InterRouterItem> = [
  {
    name: 'FeatureList',
    component: FeatureList,
  },
  {
    name: 'GPS',
    component: GPS,
  },
  {
    name: 'AudioVideo',
    component: AudioVideo,
  },
  {
    name: 'Shock',
    component: Shock,
  },
  {
    name: 'Wifi',
    component: Wifi,
  },
];

export default routers;
