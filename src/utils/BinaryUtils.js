import { ORIGIN } from '../constants';

const KB_BASED_UNIT_TABLE = {
  t: 1024 * 1024 * 1024,
  g: 1024 * 1024,
  m: 1024,
  k: 1,
};

/**
 * Utility methods for binary objects.
 */
export default class BinaryUtils {
  /**
   * Returns KB based file size.
   * @param {String} fileSize File size string
   */
  static stringToKb(fileSize) {
    const [, sizeStr, unit] = fileSize.match(
      /((?:[0-9]*\.)?[0-9]+)?([A-Z]+)?/i,
    );

    // Convert everything to KB.
    const size = Number(sizeStr);
    const sizeInKb = size * KB_BASED_UNIT_TABLE[unit.toLowerCase()];

    return sizeInKb;
  }

  /**
   * Returns the file size in user friendly format. (e.g. 10M)
   * @param {Number} sizeInKb File size in KB
   */
  static kbToString(sizeInKb) {
    for (let i = 0; i < Object.keys(KB_BASED_UNIT_TABLE).length; i += 1) {
      const unit = Object.keys(KB_BASED_UNIT_TABLE)[i];
      const threshold = KB_BASED_UNIT_TABLE[unit];
      if (sizeInKb >= threshold) {
        const fixed = Number.parseFloat(sizeInKb / threshold).toFixed(1);
        return `${fixed}${unit.toUpperCase()}`;
      }
    }
    return '';
  }

  /**
   * Creates CHECKSUMS file for the given binaries.
   * @param {Array<BinaryPackage>} binaries Array of BinaryPackage objects
   * @param {String} version Version string
   * @param {String} platform Platform string
   */
  static buildChecksums(binaries, version, platform) {
    if (!binaries.length) {
      return null;
    }

    const fileName = `CHECKSUMS.${Date.now()}`;

    let text = '';
    const addLine = (str = '', newLinesAfter = 1) => {
      text += `${str}${'\n'.repeat(newLinesAfter)}`;
    };
    const addComment = (str = '', hashtagsBefore = 0, newLinesAfter = 1) => {
      let line = `# ${str}${'\n'.repeat(newLinesAfter)}`;
      if (hashtagsBefore > 0) {
        line = `${'#\n'.repeat(hashtagsBefore)}${line}`;
      }
      text += line;
    };

    addComment(
      `Checksums for ${version} (${platform}), check with the command below:`,
    );
    addComment(`shasum -c ${fileName}`);

    addComment('Checksums-Sha1:', 1);
    const sha1Part = binaries
      .map(({ fileName: file, sha1 }) => `${sha1}  ${file}`)
      .join('\n');
    addLine(sha1Part);

    addComment('Checksums-Sha256:', 1);
    const sha256Part = binaries
      .map(({ fileName: file, sha256 }) => `${sha256}  ${file}`)
      .join('\n');
    addLine(sha256Part);

    addComment(`${ORIGIN}/kernel/${version}`, 1);

    return {
      fileName,
      text,
    };
  }
}
