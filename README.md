# Pagination JS

Lightweight script that allows you to add Pagination functionality to your site without all the hassle of doing it yourself, and only for the small amount of 1.7kb (or 3.10kb if you need ES5 support). **NO JQUERY**

It also helps you to iterate over APIs and render the data in a nice and clean way.

See the DEMO: https://n-bred.github.io/Pagination-JS/

How to use: 

- Download the script from js/
  - There are different scripts base on your needs.
  - If you only want to use it, make sure to download the miniefied one "Pagination.min.js"
  - If you need ES5 support, download the minified one "PaginationES5.min.js"
  - If you want to read the source code, i recommend you to donwload the typescript one.
- Add the script tag on your HTML page as 
  - ```<script src="Pagination.min.js"></script> ```
- Make sure to have the following conditions on your code
  - You need to have 2 elements in your HTML page.
    - The first should be a container for all the elements that you are going to generate with the data passed.
    - The second one should be the pagination container.
  - A function to use as the template generator for the data retrieved. (*Don't worry, this documentation shows you how to implement one*)
- Initialize the class by calling its constructor and passing the argumens.
  - The first argument is the element on which the data should be rendered
  - The second argument is the elemet that will contain the pagination
  - The third argument is a number representing the limit of iterations per page.
  - The fourth argument is a number that represents the index of page you're showing
  - The fitfh element is the function that acts as a template generator.
  - The sixth element is optional, its and object that contains custom classes for the pagination HTML elements. (ul, li, a).

It goes like this

```javascript
    const pagination = new Pagination(
        postsContainer,
        paginationContainer,
        5,
        1,
        makePost,
        {
            ul: 'pagination-list',
            li: 'pagination-item',
            a: 'pagination-link'
        }
    );
```

where the first two arguments are:

```javascript
    const postContainer = document.getElementById('postsContainer');
    const paginationContainer = document.querySelector('.paginationContainer');

```

and the template generator function:

```javascript

    makePost = post => `
        <div class="post">
            <p>User ID: ${post.userId}</p>
            <p>ID: ${post.id}</p>
            <p>Title: ${post.title}</p>
            <p>Body: ${post.body}</p>
        </div>`;

```

- Finally you should pass the data retrieved to the init method from the Pagination class. 
  - The data passed needs to be an array of objects, each object should have the keys used in the template generator function.

Have this as an example

```javascript

    fetch(url)
        .then(res => res.json())
        .then(data => pagination.init(data))
        .catch(err => console.error(err));

```

where the URL should be an API.

And the data should look like this.

```javascript 

   [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
    }
  ]

```

Thats it!, now you should add some CSS to it.

By default, the classes for the elements are: 

- ul = pagination__list
- li = pagination__item
- a = pagination__link

You can change them by passing an object with the new classes as the las argument.

See the DEMO: https://n-bred.github.io/Pagination-JS/