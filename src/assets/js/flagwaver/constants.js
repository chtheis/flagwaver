//
// Static constants
//

// Physics constants
// ChT: We animate the flags in slow motion: they wave quieter as if the wind speed
// were lowwer, but they still wouldn't hang down.
export const FPS = 30;
export const TIME_STEP = 1 / FPS;
export const DAMPING    = 0.03;
export const DRAG       = 1 - DAMPING;
export const G          = 9.81;

/**
 * Enum for flag hoisting side.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Hoisting
 */
export const Hoisting = {
    DEXTER:   'dexter',
    SINISTER: 'sinister'
};

/**
 * Enum for cardinal directions.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Side
 */
export const Side = {
    TOP:    'top',
    LEFT:   'left',
    BOTTOM: 'bottom',
    RIGHT:  'right'
};

/**
 * Enum for front and back sides.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Face
 */
export const Face = {
    OBVERSE: 'obverse',
    REVERSE: 'reverse'
};

/**
 * Enum for flagpole types.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} FlagpoleType
 */
export const FlagpoleType = {
    VERTICAL:   'vertical',
    HORIZONTAL: 'horizontal',
    OUTRIGGER:  'outrigger',
    CROSSBAR:   'crossbar',
    GALLERY:    'gallery'
};
