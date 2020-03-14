import THREE from 'three';

import FlagWaver, {
    WindModifiers,
    App,
    AnimationModule,
    ResizeModule,
    FlagModule,
    FlagGroupModule,
    WindModule,
    GravityModule,
    WindForceModule
} from '../../flagwaver';

let initialized = false;

// Functions
//

if (window.getParameterByName === undefined) {
    window.getParameterByName = function(name, def) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if(results == null && parent != undefined) {
            // If parent defines getParameterByName, use it.
            if (false && parent.getParameterByName !== undefined)
                return parent.getParameterByName(name, def);

             // Else try with parents location search
            results = regex.exec(parent.window.location.search);
        }
        if(results == null)
            return def;
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    };
}

function fromQuery() {
    var flags = [];
    
    for (let i = 0; i < 4; i++) {
        let imgURL   = getParameterByName('' + (i+1), null) || 'AUT';        
        flags.push(imgURL);
    }

    return flags;
}


function buildScene() {
    const scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x000000, 1000, 10000);
    scene.fog.color.setHSL(0.6, 1, 0.9);

    return scene;
}

function buildCamera() {
    const defaultAngle = 30;
    let angle = parseInt(getParameterByName('cameraAngle', defaultAngle));
    
    const camera = new THREE.PerspectiveCamera(
        angle,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );

    camera.position.x = parseInt(getParameterByName('cameraX', '0'));
    camera.position.y = parseInt(getParameterByName('cameraY', '0'));
    camera.position.z = parseInt(getParameterByName('cameraZ', (window.innerHeight / 2) / Math.tan((angle / 2) * Math.PI / 180)));

    return camera;
}

function buildRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha:     true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput        = true;
    renderer.gammaOutput       = true;
    renderer.shadowMap.enabled = true;

    return renderer;
}

function initLights(app) {
    const scene = app.scene;

    scene.add(new THREE.AmbientLight(0x222222));

    const light1 = new THREE.DirectionalLight(0xffffff, 1.75);
    const d = 300;

    light1.color.setHSL(0.6, 1, 0.9375);
    light1.position.set(50, 175, 100);
    light1.position.multiplyScalar(1.3);
    light1.castShadow           = true;
    light1.shadowMapWidth       = 2048;
    light1.shadowMapHeight      = 2048;
    light1.shadowCameraTop      = d;
    light1.shadowCameraLeft     = -d;
    light1.shadowCameraBottom   = -d;
    light1.shadowCameraRight    = d;
    light1.shadowCameraFar      = 1000;
    light1.shadowDarkness       = 0.5;

    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.35);

    light2.color.setHSL(0.3, 0.5, 0.75);
    light2.position.set(0, -1, 0);

    scene.add(light2);
}

function buildApp() {
    // Initialized location for flags from query parameter
    window.imageLocation = getParameterByName('flagLocation', window.imageLocation);
    
    const flags = fromQuery();
    const imgWidth = getParameterByName('flagWidth', 'auto');
    const imgHeight = getParameterByName('flagHeight', 'auto');
    const duration = parseInt(getParameterByName('duration', 30));
    
    const app = new App({
        scene: buildScene(),
        camera: buildCamera(),
        renderer: buildRenderer()
    });

    initLights(app);

    app.add(new ResizeModule());
    app.add(new AnimationModule());

    app.add(new WindModule({speed: getParameterByName('windSpeed', 100)}));
    
    // ChT: Add flagpoles for 2nd, 1st, and 3rd / 4th place
    app.add(new FlagGroupModule({imgSrc: flags[1], width: imgWidth, height: imgHeight, duration: duration}));
    app.add(new FlagGroupModule({imgSrc: flags[0], width: imgWidth, height: imgHeight, duration: duration}));
    app.add(new FlagGroupModule({imgSrc: flags[2], width: imgWidth, height: imgHeight, duration: duration}));
    app.add(new FlagGroupModule({imgSrc: flags[3], width: imgWidth, height: imgHeight, duration: duration}));

    // ChT: And put them in an orderly way, 2nd, 1st, 3rd and 4th
    // Distance between poles is 0.24 x innerWidth, flag width is 0.21 x innerWidth
    // Calculate offset of flag from bottom to give room for 2 flags
    // var flagStart = app.module(FlagModule.displayName, 0).subject.flag.cloth.height * 2.1;
    var flagDistance = (window.innerWidth * 0.21 * 2 / 3) * 1.1;
    if (Number.isInteger(getParameterByName('flagHeight', 'auto')))
        flagDistance = parseInt(getParameterByName('flagHeight', 'auto')) * 1.1;
        
    var flagStart = flagDistance * 2.2;
    
    app.module(FlagGroupModule.displayName, 0).subject.object.position.set(-(window.innerWidth * 0.45), (window.innerHeight * 0.6) / 2, 0);
    app.module(FlagGroupModule.displayName, 0).moveFlags(-(window.innerHeight + window.innerHeight * 0.6) / 2 + flagStart, flagDistance);
    app.module(FlagGroupModule.displayName, 1).subject.object.position.set(-(window.innerWidth * 0.21), (window.innerHeight * 0.8) / 2, 0);
    app.module(FlagGroupModule.displayName, 1).moveFlags(-(window.innerHeight + window.innerHeight * 0.8) / 2 + flagStart, flagDistance);
    app.module(FlagGroupModule.displayName, 2).subject.object.position.set(+(window.innerWidth * 0.03), (window.innerHeight * 0.4) / 2, 0);
    app.module(FlagGroupModule.displayName, 2).moveFlags(-(window.innerHeight + window.innerHeight * 0.4) / 2 + flagStart, flagDistance);
    app.module(FlagGroupModule.displayName, 3).subject.object.position.set(+(window.innerWidth * 0.27), (window.innerHeight * 0.4) / 2, 0);
    app.module(FlagGroupModule.displayName, 3).moveFlags(-(window.innerHeight + window.innerHeight * 0.4) / 2 + flagStart, flagDistance);

    app.add(new GravityModule(['flagModule']));
    app.add(new WindForceModule(['flagModule'], ['windModule']));

    return app;
}

export default function init() {
    // Prevent multiple initialization
    if (initialized) {
        throw new Error('Already initialized.');
    }

    const app = buildApp();

    initialized = true;
    
    let prestart = getParameterByName('prestart', 1);
    if (prestart > 0) {
        setTimeout(function() {
            // remove (in) visibility
            $('.bg-sky').css('visibility', '');
            app.raiseFlags = true;
        }, prestart * 1000);
    } else {
        // remove (in) visibility
        $('.bg-sky').css('visibility', '');
        app.raiseFlags = true;
    }

    return app;
}
