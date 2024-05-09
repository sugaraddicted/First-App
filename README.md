
This will start a development server, and you can view the application by navigating to `http://localhost:4200` in your web browser.

## Functional Requirements

### Lists

- **Create, Edit, and Delete**: Users can create, edit, and delete lists.
- **Placeholder for Empty List**: When the board is empty, a placeholder with the header "Add another list" and a "+" button should be displayed. Clicking the "+" button should add a new column with the ability to add a name.
- **Context Menu**: Use a context menu to edit or delete a list.
- **Editable Name**: When editing a list, the name should become editable with Save/Cancel buttons.
- **Deletion of Lists**: When a list is deleted, all cards within that list should also be deleted.
- **Number of Cards**: Each list should display the number of cards it contains.
- **Ordering of Cards**: Cards within a list could be ordered by due date (descending), or by another approach.

### Cards

- **Addition**: Users can add cards to lists.
- **Modal for Adding Cards**: When adding a new card, show a modal to fill in details such as name, description, due date, and priority.
- **Edit/Delete**: Use a context menu to edit or delete cards.
- **Move Between Lists**: Use a "Move to" dropdown to move cards between different lists within a board (e.g., To Do, In Progress, Done).

### Activity Section

- **Activity Log**: Maintain an activity log to track changes made to cards, including creation, changes to name/description/due date/priority, movement, and deletion.
- **Ordering**: Activity items should be ordered by date and time (descending).
- **History Section**: Display all changes for all cards, loading only the 20 latest records initially with an option to load the next 20 records.
- 
## Usage Frontend

```bash
npm i
npm run build
npm run serve
```
