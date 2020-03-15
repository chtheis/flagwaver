import THREE from 'three';
import loadImage from '../helpers/loadImage';
import buildFlag from '../helpers/buildFlag';

/**
 * @class FlagInterface
 *
 * @classdesc A wrapper object for managing a single flag.
 *
 * @param {Object} [options] - Options passed to buildFlag
 *   @param {string} [options.imgSrc] - Image to generate flag from
 */
export default class FlagInterface {
    constructor(options) {
        this.flag = buildFlag(null, options);
        this.object = new THREE.Object3D();
        
        this.object.add(this.flag.object);
        
        loadImage(options.imgSrc, (image) => {
            this.destroy();
            this.flag = buildFlag(image, options);
            this.object.add(this.flag.object);
        });
    }

    destroy() {
        if (this.flag) {
            this.object.remove(this.flag.object);
            this.flag.destroy();
        }
    }

    reset() {
        this.flag.reset();
    }

    simulate(deltaTime) {
        this.flag.simulate(deltaTime);
    }

    render() {
        this.flag.render();
    }
}
