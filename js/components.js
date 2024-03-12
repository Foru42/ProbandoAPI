
class MyInput extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <input type="text" placeholder="${this.getAttribute('placeholder')}">
            <button>Click</button>
        `;
        const button = this.querySelector('button');
        const input = this.querySelector('input');
        button.addEventListener('click', () => {
            const inputValue = input.value;
            alert(`¡Has hecho clic en el botón! El nombre ingresado es: ${inputValue}`);
        });
    }
}


// Aplicación de gestión de tareas
class TaskList extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <ul>
                <task-item title="Task 1"></task-item>
                <task-item title="Task 2"></task-item>
                <task-item title="Task 3"></task-item>
            </ul>
        `;
    }
}

class TaskItem extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<li>${this.getAttribute('title')}</li>`;
    }
}

// Reproductor de medios personalizado
class CustomMediaPlayer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="media-player">
                <play-button></play-button>
                <volume-control></volume-control>
                <!-- Other media controls -->
            </div>
        `;
    }
}

class PlayButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<button>Play</button>`;
    }
}

class VolumeControl extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<input type="range" min="0" max="100">`;
    }
}

// Aplicación de redes sociales
class PostCard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="post">
                <h2>Title</h2>
                <p>Content</p>
                <like-button></like-button>
                <comment-box></comment-box>
            </div>
        `;
    }
}

class LikeButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<button>Like</button>`;
        this.querySelector('button').addEventListener('click', () => {
            alert('¡Has dado "Me gusta" a esta publicación!');
        });
    }
}

class CommentBox extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="comment-box">
                <textarea placeholder="Write a comment"></textarea>
                <button>Post</button>
            </div>
        `;
        this.querySelector('button').addEventListener('click', () => {
            const comment = this.querySelector('textarea').value;
            alert(`¡Has publicado un comentario: ${comment}`);
            this.querySelector('textarea').value = ''; // Limpiar el área de comentario después de publicar
        });
    }
}


customElements.define('my-input', MyInput);
customElements.define('task-list', TaskList);
customElements.define('task-item', TaskItem);
customElements.define('custom-media-player', CustomMediaPlayer);
customElements.define('play-button', PlayButton);
customElements.define('volume-control', VolumeControl);
customElements.define('post-card', PostCard);
customElements.define('like-button', LikeButton);
customElements.define('comment-box', CommentBox);