// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { HomeTrendUp } from 'iconsax-react';

const icons = {
  dashboard: HomeTrendUp,
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //


const dashboard = {
  id: 'group-dashboard',
  title: <FormattedMessage id="dashboard" />,
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false
    },
  ]
};

export default dashboard;


