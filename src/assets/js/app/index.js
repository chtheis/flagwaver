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
    });
})(window, document, jQuery);
