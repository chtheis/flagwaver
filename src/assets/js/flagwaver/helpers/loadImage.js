import THREE from 'three';

const loader = new THREE.ImageLoader();

loader.setCrossOrigin('anonymous');

/**
 * @function loadImage
 *
 * @description Helper for loading CORS enabled images.
 *
 * @param {string} src
 * @param {Function} [callback]
 * @param {Function} [error]
 */
export default function loadImage(src, callback, error) {
    let url = window.imageLocation + '/' + src + '.png';
    
    loader.load(url, callback, null, (e) => {
        console.error(
            `FlagWaver.loadImage: Failed to load image from ${src}.`
        );

        if (error) {
            error(e);
        }
    });
}
