const blogDataUrl = '/data/posts.json';

function markdownToHtml(markdown) {
    if (!markdown) return '';
    const html = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>')
        .replace(/^\- (.*)$/gm, '<li>$1</li>')
        .replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>');

    const listHtml = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    return `<p>${listHtml}</p>`
        .replace(/<p><ul>/g, '<ul>')
        .replace(/<\/ul><\/p>/g, '</ul>')
        .replace(/<p><\/p>/g, '');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function slugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

function createPostCard(post) {
    return `
        <article class="blog-card fade-in">
            <div class="blog-image-wrapper">
                <img src="${post.image || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&h=800&fit=crop'}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="category">${post.category || 'Actualité'}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-footer">
                    <a href="blog.html?slug=${post.slug}" class="read-more">Lire l'article →</a>
                    <span class="date">${post.timeToRead || ''}</span>
                </div>
            </div>
        </article>
    `;
}

function renderBlogGrid(posts) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    blogGrid.innerHTML = sortedPosts.map(createPostCard).join('');
}

function renderArticle(post) {
    const articleContainer = document.getElementById('articleContainer');
    const blogGrid = document.getElementById('blogGrid');
    const blogTitle = document.getElementById('blogTitle');

    if (!post || !articleContainer) return;

    if (blogGrid) blogGrid.style.display = 'none';
    if (blogTitle) blogTitle.textContent = post.title;

    document.title = `${post.title} – Blog | Sancéa Vet`;

    articleContainer.innerHTML = `
        <article class="blog-card article-view">
            <div class="blog-image-wrapper">
                <img src="${post.image || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=800&fit=crop'}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="category">${post.category}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
                <h1>${post.title}</h1>
                <p class="article-excerpt">${post.excerpt}</p>
                <div class="article-body">${markdownToHtml(post.body)}</div>
                <p class="article-note">Durée de lecture : ${post.timeToRead || 'N/A'}</p>
            </div>
        </article>
        <p><a href="blog.html">← Retour aux articles</a></p>
    `;
}

function renderNotFound() {
    const container = document.getElementById('articleContainer') || document.getElementById('blogGrid');
    if (!container) return;
    container.innerHTML = `<div class="blog-error"><h2>Article introuvable</h2><p>Le contenu demandé n'existe pas encore. Retournez à la page <a href="blog.html">des articles</a>.</p></div>`;
}

async function loadBlog() {
    try {
        const response = await fetch(blogDataUrl);
        if (!response.ok) throw new Error('Impossible de charger les données du blog.');
        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        const slug = slugFromUrl();

        if (window.location.pathname.endsWith('blog.html') && slug) {
            const post = posts.find(item => item.slug === slug);
            if (post) {
                renderArticle(post);
            } else {
                renderNotFound();
            }
        } else {
            renderBlogGrid(posts);
        }
    } catch (error) {
        console.error(error);
        const container = document.getElementById('blogGrid');
        if (container) container.innerHTML = '<p>Impossible de charger les articles pour le moment.</p>';
    }
}

window.addEventListener('DOMContentLoaded', loadBlog);
