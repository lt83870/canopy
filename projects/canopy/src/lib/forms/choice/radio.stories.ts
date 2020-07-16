import { ReactiveFormsModule } from '@angular/forms';

import { withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata } from '@storybook/angular';

import { CanopyModule } from '../../canopy.module';
import { notes } from './choice.notes';
import { createChoiceStory, ReactiveFormComponent } from './choice.stories.common';

export default {
  title: 'Components/Form/Radio',
  parameters: {
    decorators: [
      withKnobs,
      moduleMetadata({
        imports: [ReactiveFormsModule, CanopyModule],
        declarations: [ReactiveFormComponent],
      }),
    ],
    'in-dsm': {
      id: '5ec4fc7c5dd42a743133d4f8',
    },
    notes: {
      markdown: notes('Radio'),
    },
  },
};

export const standard = () => createChoiceStory('radio');
