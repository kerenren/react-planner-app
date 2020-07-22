Planner App

---

Summary

In this assignment you will create an app that will let you add elements to a ‘to do’ list and to move it from that list to a ‘done’. This app needs to be created using React and create-react-app.

The app should have extra features: delete post, star post (takes it to the top), edit post, reset app. When clicking on the tick button, it should move the post from ’To do’ to ‘done’ and vice versa.

There should also be a reset button that allows you to clear the list.
You may include any other functionalities of your own.

You can take inspiration from other apps, such as Wunderlist.

Before you start
Grab a pen and paper and think about the flow of your app. Which components will you need, which information / state should they store, how that information should be structured, how the different components communicate between each other.
Be sure you understand how to create a new branch and move from one branch to the other as well as how to merge a feature branch to the master branch.

Approaching the assignment

1. Sit and think about the implementation
   a. The layout of the app
   b. Libraries you want to use (bootstrap?)
   c. Which components you will have, and what is each component responsibility
   d. Different functionalities - how your app should behave: It is good to write user stories (flows of the app)

2. Start with a small, basic UI, one feature at a time.
3. Try to make it as close to a complete product as you can

4. Try to write everything from scratch, don’t copy code from the internet.

Basic Requirements

1. You should have the ability to add a new post item.
2. You should have two lists. Todo and Done. Todo will contain the items that need to be done. Done will contain the items that are completed.
3. You should have the ability to mark an item as done. The item should then appear in the Done list.
4. You should have the ability to return a done item to the todo list. The item should then appear in the Todo list.
5. You should be able to delete an item from both lists.

Technical Notes

Your components can be styled with any of the following libraries (note that the order is arbitrary):
Ant Design
React Material-UI
React-Bootstrap
The whole project should be synced with a github repo. Working directly in the master is not allowed. You need to cut your work in features, and create a branch for each of them. Once a feature is finished, you can push it to the master.
Your commits must be clean. Committing several changes on a single commit is not allowed.
Keep an organized folder structure - components in “components” folder, pages in another folder and reusable code in lib folder.

Milestone 1

Features:
Create an input element that on click, it will add a new post.
Make it also work with enter.

Milestone 2

Features:
Add a button that will move the elements from one list to the other and vice versa.
The list should preserve its original creation order instead of being added at the end of the list.

Milestone 3
Features:
Add a delete button to the post.

Milestone 4
Features:
Add a favourite post button. Hitting that button, should make the post move to the top position in the list. If the post is moved to the other list, it should keep the star.
The favorite posts should get sorted by creation order.

Milestone 5
Features:
Add an edit post button.
The edit post should give focus to the element. Accept the changes on enter, cancel the new changes on escape.

Milestone 6
Features:
Add a reset button
The reset button should only appear when there is at least one post in the lists.

Milestone 7
Add some extra features:
Make your app persistent by storing the list in a realtime database (Firebase)
Add for each item a description and a due date (time to complete the task). Think about how you want to display this information. You can do it in a panel on the right side.

Milestone 8

Add a quick reminder, such as remind me in: 1 min, 5 min, 15 min, 1 hour, 2 hours. This reminder should be editable as well.
Add the ability to sort the list of todos according to the creation date, due date or favourite (favourite first).
Add a general reminder in a specific date and a specific time. Think about how you can test it
