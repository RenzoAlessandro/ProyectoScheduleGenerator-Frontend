// third-party
import { FormattedMessage } from 'react-intl';

// type
import { Calendar, TableDocument, ElementPlus } from 'iconsax-react';

// icons
const icons = {
  calendar: Calendar,
  classsession: TableDocument,
  teachingunit: ElementPlus
};

// ==============================|| MENU ITEMS - COMPONENTS ||============================== //

const components = {
  id: 'schedule-planning',
  title: <FormattedMessage id="schedule-planning" />,
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'teaching-unit',
      title: <FormattedMessage id="teaching-units" />,
      url: '/teaching-unit',
      type: 'item',
      icon: icons.teachingunit,
    },
    {
      id: 'class-sessions',
      title: <FormattedMessage id="class-sessions" />,
      url: '/class-session-list',
      type: 'item',
      icon: icons.classsession,
    },
    {
      id: 'class-session-calendar',
      title: <FormattedMessage id="calendar" />,
      url: '/class-session-calendar',
      type: 'item',
      icon: icons.calendar,
    },
  ]
};

export default components;
