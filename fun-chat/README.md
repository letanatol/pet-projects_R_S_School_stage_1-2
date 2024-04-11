# Fun Chat

1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/fun-chat/README.md)
2. Screenshot:
3. Deploy: [link](https://rolling-scopes-school.github.io/letanatol-JSFE2023Q4/fun-chat/)
4. Done 23.04.2024 / deadline 23.04.2024
5. Score: 
- Cross-check 250/250
- Mentor 160/160

### Functional requirements (+250)

## 1. User Authentication Page (+30)
  - [] (+10) The authentication form validates the entered data based on at least two different criteria. Such as, for example, case sensitivity and the use of special characters. The selection of validation criteria and their display options is at the student's discretion and must be evaluated solely based on the quantity and functionality.
  - [] (+5) The user is unable to submit an authentication request with data that has not passed validation.
  - [] (+5) In case of an authentication error (based on the server response), a message indicating the corresponding error sent by the server must be displayed.
  - [] (+5) User authentication is possible both by clicking the button with the mouse or by pressing the "Enter" key without the need to focus on the button.
  - [] (+5) Access is granted only to not authenticated users.

## 2. Main Page (+10)
  - [] (+10) Access is granted only to authenticated users.

## 3. Header (on the main page) (+10)
  - [] (+3) Displays the current authenticated user's name.
  - [] (+2) Displays the app's name.
  - [] (+5) Includes a logout button which when pressed terminates the current session and opens the authentication form (window/page).

## 4. Footer (on the main page) (+5)
  - [] (+5) Includes the school's logo and name, the author's name, a link to the author's GitHub, and the year of the app creation.

## 5. User List (on the main page) (+30)
  - [] (+10) Displays all registered users and an indicator of each user's online status.
  - [] (+5) The currently authenticated user is not in the list.
  - [] (+5) Implements user search by name. The search will be case sensitive or case-insensitive at the student's discretion.
  - [] (+10) Displays information about the number of unread messages from each user.

## 6. User Dialogue (on the main page) (+75)
  - [] (+5) Provides information about the user with whom the dialogue is open, as well as indicating whether that user is online.
  - [] (+5) Provides a complete message history with the selected user, including messages from both the current user and the user with whom the dialogue is currently open.
  - [] (+5) Arranges messages chronologically based on the time of sending. The latest message is displayed near the message input and send component.
  - [] (+5) In the absence of message history, a message in the message history field indicates that this is the beginning of the dialogue.
  - [] (+5) When sending a message to another user, the message history scrolls to the sent message (making the just-sent message visible to the user).
  - [] (+5) When receiving a message from another user in an open dialogue, the message history scrolls to the received message (making the just-received message visible to the user).
  - [] (+5) When opening a dialogue with unread messages, new messages are separated from the read messages by a dividing line, and the user can see the dividing line and at least one unread message.
  - [] (+5) When new unread messages appear (before meeting the conditions to remove the dividing line), the line must always stay within the dialogue area and not hide in the scroll area.
  - [] (+5) The dividing line between read and unread messages can be removed by each of the following actions: when scrolling the message history area, after clicking the message send button, or clicking inside the message history area.
  - [] (+5) If no recipient is selected, the message send button and message input field must be inactive (or hidden), and there must be a message in the message history field indicating the need to select a recipient.
  - [] (+5) Sending a message to a user is possible both by clicking the send button with the mouse or by pressing the "Enter" key without the need to focus on the send button.
  - [] (+10) The user can delete their own previously sent messages.
  - [] (+10) The user can edit the text of their own previously sent messages.

## 7. Message Content (on the main page) (+25)
  - [] (+15) Messages include the time of sending, sender's username, message delivery status, message text, and indication of whether the message has been edited.
  - [] (+5) The message "delivered"/"read" status is visible only to the sender of the message.
  - [] (+5) A user cannot send a message without any content (without text).

## 8. Message Delivery and Read Status (on the main page) (+20)
  - [] (+10) The status changes to "delivered" when the message recipient logs into the application or if the message is sent to the user who is online.
  - [] (+10) The status changes to "read" when the message recipient opens a dialogue with unread messages and performs any of the following actions: scrolls in the message history area, sends a new message, or clicks inside the message history area.

## 9. About Page (+10)
  - [] (+5) Contains brief information about the application and its author. The content is at the student's discretion.
  - [] (+5) Access is granted to all users.

## 10. Interface and Visual Design (+15)
  - [] (+5) The browser tab must display the application icon.
  - [] (+5) The interface elements with which the user will interact must be responsive and the cursor must change when they are hovered over.
  - [] (+5) Responsive layout must be implemented for resolutions ranging from 1440 px to 380 px, inclusive.

## 11. Server Connection (on all pages) (+20)
  - [] (+10) If a sudden disconnection from the server occurs, a message must be displayed to the user, and an attempt to restore the connection must be made.
  - [] (+10) Upon reconnecting to the server, the application must perform the current user reauthorization without requiring user intervention.


### Technical Requirements (+160)

  - [] (+20) The application is divided into logical modules/layers, such as, for example, API interaction, user interface rendering, application state management, etc.
  - [] (+20) All HTML content is generated using JavaScript. Body must be empty. Either head or body can contain the only <script> tag (body containing only the <script> tag is considered to be empty).
  - [] (+20) The application is a Single Page Application (SPA) with implemented routing.
  - [] (+20) Input/output parameters of all methods are explicitly typed, and the any type is not used.
  - [] (+20) ESLint with the Airbnb style guide is used, with the noInlineConfig: true rule enabled in the configuration.
  - [] (+10) Prettier is used to automatically format code, ensuring a consistent and readable code style.
  - [] (+10) Husky is used to manage Git hooks, automating tasks such as code formatting and linting checks during the commit process.
  - [] (+10) Webpack or another module bundler is used.
  - [] (+10) Code is organized into small functions with clear names and purposes, with each function not exceeding 40 lines.
  - [] (+10) There is no code duplication.
  - [] (+10) The code does not contain magic numbers or strings.


## Penalties Cross-Check
- (-15) For recurring application errors, a deduction is allowed only once for each distinct type of error.
- (-5) For layout issues where the elements overlap or cover each other, a deduction is allowed only once for each distinct type of issue.

## Penalties Mentor
- (-100%) Use of JavaScript libraries or frameworks such as JQuery, React, Angular, Vue, Lodash, etc.
- (-100%) If the application is not written in TypeScript.
- (-50%) If the entire content of the page is not generated using TypeScript (if index.html contains more than just the body tag).
- (-50) With remarks on code quality, readability.
