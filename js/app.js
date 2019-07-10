const url = 'https://jsonplaceholder.typicode.com/posts';

makePost = data => `
    <div class="post">
        <p>User ID: ${data.userId}</p>
        <p>ID: ${data.id}</p>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
    </div>`;

const pagination = new Pagination(
   document.getElementById('data'),
   document.querySelector('.pagination'),
   10,
   1,
   makePost
);

fetch(url)
   .then(res => res.json())
   .then(data => pagination.init(data))
   .catch(err => console.error(err));
