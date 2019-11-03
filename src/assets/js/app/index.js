/**
 * Flag Waver
 *
 * Simulate a flag waving in the breeze right in your browser window.
 *
 * /u/krikienoid
 *
 */

import HashState, { isHistorySupported } from './helpers/HashState';
import initFlagWaverApp from './main';

var app;

//
// Flag Waver UI
//

(function (window, document, $) {
    //
    // Vars
    //

    //
    //
    // Init
    //

    $(document).ready(function () {
        //
        // Init
        //

        // Init flagWaver and append renderer to DOM
        app = initFlagWaverApp();
        window.FW_App = app;
        $('.js-flag-canvas').append(app.renderer.domElement);
        window.dispatchEvent(new window.Event('resize'));
        
        // On click anywhere in browser start raising the flags
        $('body').on('click', function() {FW_App.raiseFlags = true;});
    });
})(window, document, jQuery);
