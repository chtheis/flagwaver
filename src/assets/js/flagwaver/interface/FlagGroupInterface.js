import THREE from 'three';
import buildFlagpole from '../builders/buildFlagpole';
import FlagInterface from './FlagInterface';

/**
 * @class FlagGroupInterface
 *
 * @classdesc A wrapper object for managing a flagpole and flag.
 *
 * @param {Object} [options] - Options passed to buildFlag and buildFlagpole
 */
export default class FlagGroupInterface {
    constructor(options) {
        // ChT
        // The speed to raise the flag. The higher the faster the flags raise.
        // With speed == 2 it takes about 60s to raise the flag of the winner
        this.speed = 2; 

        this.object = new THREE.Object3D();

        this.flagpole = buildFlagpole({});
        this.flagInterfaces = [];
        
        for (let src of options.imgSrc.split(','))
            this.flagInterfaces.push(new FlagInterface({imgSrc : src}));
                
        this.object.add(this.flagpole.object);
        
        for (let flagInterface of this.flagInterfaces) {
            this.object.add(flagInterface.object);
        
            this.flagpole.addFlag(flagInterface.flag);
        }

/*
        this.setFlagpoleOptions(options);
        this.setFlagOptions(options);
 */
    }

    static FlagInterface = FlagInterface;

    destroy() {
        if (this.flagpole) {
            this.object.remove(this.flagpole.object);
            this.flagpole.destroy();
        }

        for (let flagInterface of this.flagInterfaces) {
            this.object.remove(flagInterface.object);
            flagInterface.destroy();
        }
        
        this.flagInterfaces = [];
    }

    reset() {
    }

    simulate(deltaTime) {
        // ChT: Raise the flag! It takes about 60s for the 1st pole
        let maxY = this.flagpole.object.position.y - 4;
        
        if (this.flagpole && this.flagInterfaces) {
            for (let flagInterface of this.flagInterfaces) {
                if (maxY > flagInterface.object.position.y)
                    flagInterface.object.position.y += 0.1 * this.speed;
                
                maxY -= 220;
            }
        }
    }

    render() {
    }
}
