/**
 * Corrige rutas en GitHub Pages (sitio en /nombre-repo/)
 */
(function () {
    var base = './';
    var host = window.location.hostname;

    if (host.endsWith('.github.io')) {
        var parts = window.location.pathname.split('/').filter(Boolean);
        var repo = parts[0];
        if (repo && repo !== 'index.html' && !/\.[a-z0-9]+$/i.test(repo)) {
            base = '/' + repo + '/';
        }
    }

    window.ORBITAL_BASE = base;

    var tag = document.createElement('base');
    tag.href = base;
    var head = document.head || document.getElementsByTagName('head')[0];
    if (head.firstChild) {
        head.insertBefore(tag, head.firstChild);
    } else {
        head.appendChild(tag);
    }
})();
