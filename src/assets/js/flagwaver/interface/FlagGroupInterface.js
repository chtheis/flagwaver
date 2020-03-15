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
        // ChT: the duration to raise the 1st place flag
        this.duration = options.duration; 

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
        // ChT: We need our own clock to raise the flag in real time,
        // even on low performance devices
        this.clock = new THREE.Clock();
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
        // ChT: Raise the flag! 
        if (!window.FW_App.raiseFlags)
            return;
        
        // Get our own delta because the argument  may be shorter than the 
        // real time difference
        let delta = this.clock.getDelta();
        
        // Calculate offset
        const flagStart = (window.innerWidth * 0.21 * 2 / 3) * 1.1 * 2.2;
        let offset = (window.innerHeight * 0.9 - flagStart) / this.duration * delta;
        let maxY = this.flagpole.object.position.y - 4;
        
        if (this.flagpole && this.flagInterfaces) {
            for (let flagInterface of this.flagInterfaces) {
                if (maxY > flagInterface.object.position.y + offset)
                    flagInterface.object.position.y += offset;
                else if (maxY > flagInterface.object.y)
                    flagInterface.object.position.y = maxY;
                
                maxY -= flagInterface.flag.cloth.height * 1.1;
            }
        }
    }

    render() {
    }
}
