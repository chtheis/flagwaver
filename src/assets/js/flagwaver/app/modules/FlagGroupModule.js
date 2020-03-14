import FlagGroupInterface from '../../interface/FlagGroupInterface';
import ControlModule from './ControlModule';
import FlagModule from './FlagModule';

/**
 * @class FlagGroupModule
 *
 * @classdesc An interface for a flagpole and its flag.
 *
 * @param {Object} [subject]
 * @param {THREE.Object3D} [context]
 */
export default class FlagGroupModule extends ControlModule {
    constructor(flagOpt) {
        super();

        this.subject = null;
        this.context = null;
        this.flags = [];
        
        this.flagOpts = flagOpt
    }

    static displayName = 'flagGroupModule';
    static Subject = FlagGroupInterface;

    init(app) {
        this.subject = new this.constructor.Subject(this.flagOpts);

        if (!this.context) {
            app.scene.add(this.subject.object);
        }

        
        for (let flagInterface of this.subject.flagInterfaces)
            this.flags.push(new FlagModule(flagInterface, this.subject.object));

        for (let flag of this.flags)
            app.add(flag);
        
    }

    deinit(app) {
        for (flag of this.flags)
            app.remove(flag);

        if (!this.context) {
            app.scene.remove(this.subject.object);
            this.subject.destroy();
        }
    }

    reset() {
        this.subject.reset();
        this.subject.render();
    }

    update(deltaTime) {
        this.subject.simulate(deltaTime);
        this.subject.render();
    }
    
    moveFlags(y, offset) {
        let ypos = y;
        
        for (let flagInterface of this.subject.flagInterfaces) {
            flagInterface.object.position.y = ypos;
            ypos -= offset;
        }           
    }
}
