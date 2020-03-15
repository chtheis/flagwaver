import Flagpole from '../subjects/Flagpole';

/**
 * @function buildFlagpole
 *
 * @description Helper for generating different types of flagpoles.
 *
 * @param {Object} [options]
 */
export default function buildFlagpole(options) {
    const settings = Object.assign({}, options);
    let flagpole;

    flagpole = new Flagpole(settings);

    return flagpole;
}
