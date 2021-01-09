# InfiniteLibrary
*By Ivan Roth - [Visit InfiniteLibrary](http://the-infinite-library.herokuapp.com/)*

**Table of Contents**
* [InfiniteLibrary at a Glance](#infinitelibrary-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture)
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## InfiniteLibrary at a Glance
InfiniteLibrary is a full-stack web app for listing and reviewing books, where users can add books to the collection and leave reviews for their friends to see.


##### InfiniteLibrary at a glance
![InfiniteLibrary at a glance](overview.png)

InfiniteLibrary allows users to add bibliographic listings for books, with cover art automatically supplied via the Google Books API, and to add reviews to books already listed.

##### Adding books
<!-- ![Feed search and collection creation](feedsearch.png) -->

Users can add new books via a form which allows them to enter a title, author, and optionally a date of publication for the new bibliographic record. The app then automatically retrieves a matching cover image (if one exists) and generates the record.
