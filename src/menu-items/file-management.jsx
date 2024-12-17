// third-party
import { FormattedMessage } from 'react-intl';

// type
import { CpuCharge } from 'iconsax-react';

// icons
const icons = {
  plugins: CpuCharge,
};

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const components = {
  id: 'group-file-management',
  title: <FormattedMessage id="file-management" />,
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'study-plan-management',
      title: <FormattedMessage id="study-plan" />,
      url: '/studyplan-management',
      type: 'item',
      icon: icons.plugins,
    },
    {
      id: 'teaching-staff-management',
      title: <FormattedMessage id="teaching-staff" />,
      url: '/teachingstaff-management',
      type: 'item',
      icon: icons.plugins,
    },
    {
      id: 'infrastructure-management',
      title: <FormattedMessage id="infrastructure" />,
      url: '/infrastructure-management',
      type: 'item',
      icon: icons.plugins,
    },
  ]
};

export default components;
