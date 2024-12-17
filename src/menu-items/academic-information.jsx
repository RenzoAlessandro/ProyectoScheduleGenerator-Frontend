// third-party
import { FormattedMessage } from 'react-intl';

// type
import { Profile2User, Hierarchy, Buildings } from 'iconsax-react';

// icons
const icons = {
  customer: Profile2User,
  studyplan: Hierarchy,
  infrastructure: Buildings,
};

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const components = {
  id: 'academic-information',
  title: <FormattedMessage id="academic-information" />,
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'study-plan',
      title: <FormattedMessage id="study-plan" />,
      url: '/study-plan',
      type: 'item',
      icon: icons.studyplan,
    },
    {
      id: 'teaching-staff',
      title: <FormattedMessage id="teaching-staff" />,
      url: '/teaching-staff',
      type: 'item',
      icon: icons.customer,
    },
    {
      id: 'infrastructure',
      title: <FormattedMessage id="infrastructure" />,
      url: '/infrastructure',
      type: 'item',
      icon: icons.infrastructure,
    },
  ]
};

export default components;
