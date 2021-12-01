/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemin des images de la lightbox
 * @property {string} url Image actuellement affichée
 */
class Ligthbox {

    static init (){
        const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault();
                new Ligthbox(e.currentTarget.getAttribute('href'), gallery);
            }))
    }

    /**
     * 
     * @param{string} url URL de l'image
     * @param{string[]} images Chemin des images de la lightbox
     */
    constructor(url, images){
        this.element = this.buildDOM(url);
        this.images = images;
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    /**
     * 
     * @param{string} url URL de l'image
     */
    loadImage(url){
        this.url = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container');
        const loader = document.createElement('div');
        loader.classList.add('lightbox__loader');
        container.innerHTML = '';
        container.appendChild(loader);
        image.onload = () => {
            container.removeChild(loader);
            container.appendChild(image);
            this.url = url;
        };
        image.src = url;
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e){
        if(e.key === 'Escape'){
            this.close(e);
        }
    }

    /**
     * Close lightbox
     * @param {MouseEvent/KeybordEvent} e 
     */
    close(e){
        e.preventDefault();
        this.element.classList.add('fadeOut');
        window.setTimeout(()=> {
            this.element.parentElement.removeChild(this.element)
        }, 500);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * @param {MouseEvent/KeybordEvent} e 
     */
    next(e){
        e.preventDefault();
        let i = this.images.findIndex(image => image === this.url);
        if(i === this.images.length - 1){
            i = -1;
        }
        this.loadImage(this.images[i + 1]);
    }

    /**
     * @param {MouseEvent/KeybordEvent} e 
     */
    prev(e){
        e.preventDefault();
    }

    /**
     * 
     * @param{string} url URL de l'image
     * @return{HTMLElement}
     */
    buildDOM(url){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
            <div class="lightbox__container"></div>`;
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this));
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this));
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this));
        return dom;
    }
}
/**
 * <div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
            <img src="https://picsum.photos/900/1800" alt="">
        </div>
    </div>
 *  */ 

Ligthbox.init();