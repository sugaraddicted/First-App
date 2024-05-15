import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../app/store/reducers/boards.reducer';
import { CardDetailsModalComponent } from '../app/card-details-modal/card-details-modal.component';
import { CardModalComponent } from '../app/card-modal/card-modal.component';
import { CardService } from '../app/_services/card.service';
import { ListService } from '../app/_services/list.service';
import { ActivityService } from '../app/_services/activity.service';
import { provideMockStore } from '@ngrx/store/testing';
import { MatMenuModule } from '@angular/material/menu';

const meta: Meta<CardDetailsModalComponent> = {
  title: 'Example/CardDetailsModal',
  component: CardDetailsModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardDetailsModalComponent, CardModalComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule,
        StoreModule.forRoot({ boards: boardReducer }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { card: { id: '1', name: 'Sample Card', description: 'This is a sample card description.', dueDate: new Date(), priority: 1, boardListId: '1', boardId: '1' } } },
        CardService,
        ListService,
        ActivityService,
        provideMockStore({}),
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardDetailsModalComponent>;

export const Default: Story = {
  args: {
    data: {
      card: {
        id: '1',
        name: 'Sample Card',
        description: 'This is a sample card description.',
        dueDate: new Date(),
        priority: 1,
        boardListId: '1',
        boardId: '1',
      },
    },
  },
};
