import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../app/store/reducers/boards.reducer';
import { ListComponent } from '../app/list/list.component';
import { CardComponent } from '../app/card/card.component';
import { CardModalComponent } from '../app/card-modal/card-modal.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CardService } from '../app/_services/card.service';
import { ListService } from '../app/_services/list.service';

const meta: Meta<ListComponent> = {
  title: 'Example/List',
  component: ListComponent,
  decorators: [
    moduleMetadata({
      declarations: [ListComponent, CardComponent, CardModalComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot({ boards: boardReducer }),
      ],
      providers: [
        CardService,
        ListService,
        provideMockStore({}),
      ],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ListComponent>;

export const Default: Story = {
  args: {
    list: {
      id: '1',
      name: 'Sample List',
      boardId:'board-1',
      createdAt: new Date(),
      cards: [
        {
          id: '1',
          name: 'Sample Card 1',
          description: 'Description for Sample Card 1',
          dueDate: new Date(),
          priority: 1,
          boardListId: '1',
          boardId: '1',
        },
        {
          id: '2',
          name: 'Sample Card 2',
          description: 'Description for Sample Card 2',
          dueDate: new Date(),
          priority: 0,
          boardListId: '1',
          boardId: '1',
        },
      ],
    },
  },
};
