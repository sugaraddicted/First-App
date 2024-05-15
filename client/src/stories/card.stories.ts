import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../app/store/reducers/boards.reducer';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CardComponent } from '../app/card/card.component';
import { CardDetailsModalComponent } from '../app/card-details-modal/card-details-modal.component';
import { ListService } from '../app/_services/list.service';
import { CardService } from '../app/_services/card.service';
import { provideMockStore } from '@ngrx/store/testing';

const meta: Meta<CardComponent> = {
  title: 'Example/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardComponent, CardDetailsModalComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StoreModule.forRoot({ boards: boardReducer }),
      ],
      providers: [
        ListService,
        CardService,
        provideMockStore({}),
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    card: {
      id: '1',
      name: 'Sample Card',
      description: 'This is a sample card description.',
      dueDate: new Date(),
      priority: 1,
      boardId: 'board-1',
      boardListId: 'list-1',
    },
  },
};

export const HighPriority: Story = {
  args: {
    card: {
      id: '2',
      name: 'High Priority Card',
      description: 'This card has high priority.',
      dueDate: new Date(),
      priority: 2,
      boardId: 'board-2',
      boardListId: 'list-2',
    },
  },
};

export const LowPriority: Story = {
  args: {
    card: {
      id: '3',
      name: 'Low Priority Card',
      description: 'This card has low priority.',
      dueDate: new Date(),
      priority: 0,
      boardId: 'board-3',
      boardListId: 'list-3',
    },
  },
};