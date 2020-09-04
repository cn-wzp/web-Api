const posts = document.getElementById('posts');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');
let limit = 5;
let page = 1;

async function getapi() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}
async function tianjia() {
    const postsEl = await getapi();
    postsEl.forEach(e => {
        const post1 = document.createElement('div');
        post1.classList.add('post');
        post1.innerHTML = `<div class="number">${e.id}</div>
    <div class="post-info">
    <h2 class="post-title">${e.title}</h2>
    <p class="post-body">${e.body}</p>
    </div>`;
        posts.appendChild(post1);
    });
}

function shuaxin() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => {
            page++;
            tianjia();
        }, 400);
    }, 1000);
}

function neirong(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}
tianjia();
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        shuaxin();
    }
});
filter.addEventListener('input', neirong);