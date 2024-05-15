import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../app/store/reducers/boards.reducer';
import { CardModalComponent } from '../app/card-modal/card-modal.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CardService } from '../app/_services/card.service';
import { ListService } from '../app/_services/list.service';


const meta: Meta<CardModalComponent> = {
  title: 'Example/CardModal',
  component: CardModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardModalComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({ boards: boardReducer }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { listId: '1', card: { id: '1', name: 'Sample Card', description: 'This is a sample card description.', dueDate: new Date(), priority: 1, boardListId: '1', boardId: '1' } } },
        CardService,
        ListService,
        provideMockStore({}),
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardModalComponent>;

export const Default: Story = {
  args: {
    data: {
      listId: '1',
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
