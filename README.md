# User Stories

## Adding a book

As a registered user who has read or wants to read a book that's not in the InfiniteLibrary database already, I want to add it to the database so that I can quickly and easily mark it as read or want to read and/or review it.

### Questions

* What information will the user need to provide to add a book?
The user can add a book by providing only the book's title and author name. The functionality to accept other combinations of uniquely identifying data (such as ISBN, title + year of publication, etc.) may be added later if time allows.

* How will the other details of the book be filled out?
InfiniteLibrary will retrieve the rest of the book's bibliographic information using the Library of Congress API (https://libraryofcongress.github.io/data-exploration/)

* What route will be used for adding a book to the database?
The route /books will be pinged with a POST request to add a book.


## Reviewing a book

As a registered user with an opinion on one of the books in the InfiniteLibrary database, I want to leave a review so that other users can read what I have to say about it.

### Questions

* Can one user leave multiple reviews?
No. This feature may be added later if time allows, however.

* What route will be used for adding a review?
The route /book/:id/reviews will be pinged with a POST request to add a review.

* Will users be able to edit their reviews?
No. This feature may be added later if time allows.


## Marking status of a book

As a registered user who has either read or would like to read a book in InfiniteLibrary's database, I want to mark it as Read/To-Read (as appropriate) to remember that status for myself and display it to other users.

### Questions

* What are the possible statuses?
Read, To-Read, and None.

* Can the user change a book's status after marking it once?
Yes.

* Can the user set a book's status back to "None" after marking it as "Read" or "To-Read"?
Yes.

* What route will be used to make these changes?
The route /book/:id will be hit with a POST request that specifies in its body that it is a status change request for the relevant user.

## Creating a list

As a registered user, I want to create a personal list of books in order to keep track of books that share a certain property.

### Questions

* Will lists be publicly viewable by other users?
Yes.

* With it be possible to edit a list?
Yes.

* What route will be used to create a list?
The route /users/:id/lists will be hit with a POST request to create the list.

* Will the user be able to choose the ordering of the books on the list?
Yes.

## Viewing a profile

As a registered user, I want to view a user's account so I can see their activity on InfiniteLibrary.

### Questions

* What types of activity will be visible on a user's profile page?
Reviews, status changes, and creation or editing of lists.

* What route will be used to access a user's profile page?
The route /users/:id will be hit with a GET request to access a user's profile.

## Viewing a book

As a registered user, I want to view the page for an individual book so I can learn more about it and see what I and other users have said about it.

### Questions

* What information will be visible on an individual book's page?
The title, author, publication year, a cover image, and a brief synopsis, as well as recent user activity related to that book.
