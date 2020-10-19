import { ReactiveFormsModule } from '@angular/forms';

import { withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { CanopyModule } from '../../canopy.module';
import { notes } from './radio.notes';
import { createRadioStory, ReactiveFormComponent } from './radio.stories.common';

export default {
  title: 'Components/Form/Segment',
  parameters: {
    decorators: [
      withKnobs,
      moduleMetadata({
        imports: [ReactiveFormsModule, CanopyModule],
        declarations: [ReactiveFormComponent],
      }),
    ],
    'in-dsm': {
      id: '5ed64569a269db443068121a',
    },
    notes: {
      markdown: notes('Segment'),
    },
  },
};

export const standard = () => createRadioStory('segment');
