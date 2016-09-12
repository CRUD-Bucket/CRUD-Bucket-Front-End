# CRUD-Bucket-Front-End

CRUD Bucket is a web application which allows users to easily upload, organize
and share files. All users can view and download all other users’ files.
Users can rename and delete files their own files, as well. Date uploaded and
date modified are automatically generated and shown for each file. Files can be
organized into folders, and folders can be created within other folders
allowing users to organize their files as they like.

## Technologies

### Front-end

-   Javascript

-   HTML/CSS

-   jQuery

-   Node.js

-   Handlebars

-   Bootstrap

### Back-end

-   Express

-   MongoDB

-   AWS-S3

## Project Approach

This project was created by a team consisting of David Powell, Ying Xin and
Gabe Scarbrough. We began by first meeting to discuss goals, write user
stories, create an ERD, set a schedule and assign tasks. Roles were assigned
to each team member to give everyone final say on one aspect of the project.
David was back-end lead and made the final call on decisions for our API.
Ying was front-end lead and made final decisions for our user-facing app.
Gabe was project lead and was in charge of scheduling meetings, deadlines
and keeping the project on task.

In the process of creating this app we heavily utilized peer programming.
Most of the time two team members were working on a feature together while
the third member worked on another feature or researched technologies we would
need to use. This allowed us to minimize merge conflicts, as well as be more
productive. Often times one peer would realize bugs before the code had even
been run and this attention to detail allowed us to move at a brisk pace.

The only planned feature we were unable to ship was breadcrumbs. While we
discussed how to implement this, we simply didn’t have enough time to get it
functional for the first deployed version of the app. We would like to add
breadcrumbs in version two to allow users to easily move back through folders
without going back to their root folder.

The biggest hurdles we faced were figuring out materialized paths and event
targets. Materialized paths were new to us and took a little while to wrap our
heads around but once we did everything began to fall into place. They allowed
to to not only let users put files into folders but also put folders into
folders. Learning jQuery event targets solved our biggest issue we ran into,
which was how to effectively add event handlers to the page after rendering it
using Handlebars templates. Overall, we really enjoyed working on this project.

### [User Stories](user-stories.md)

### [ERD](ERD.png)

### [Wireframes](wireframe.png)

### [Live App](https://crud-bucket.github.io/CRUD-Bucket-Front-End)

### [Back-End API](https://github.com/CRUD-Bucket/CRUD-Bucket-Back-End)
