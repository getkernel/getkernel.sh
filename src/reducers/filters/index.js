/**
 * Filters reducer.
 */
import defaultState from './defaultState';
import Version from '../../models/Version';
import Compare from '../../utils/Compare';

export { defaultState };

export default (state, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_VERSIONS': {
      const availableVersions = [];
      const versions = action.data.results.map(
        ({ versionName }) => new Version(versionName),
      );

      versions.forEach((version) => {
        if (!availableVersions.some(({ major }) => major === version.major)) {
          const minors = versions.filter((v) => v.major === version.major);
          // Sort minors in descending order.
          minors.sort(Compare.version('desc'));

          availableVersions.push({
            major: version.major,
            count: minors.length,
            minors: [...new Set(minors.map((m) => m.toShortString()))],
          });
        }
      });

      // Sort by major in descending order.
      availableVersions.sort((a, b) =>
        Compare.string('desc')(a.major, b.major),
      );

      return {
        ...state,
        availableVersions,
      };
    }

    case 'SET_AVAILABLE_DISTROS': {
      const availableDistros = [];
      const versions = action.data.results.map(
        ({ versionName }) => new Version(versionName),
      );

      versions.forEach((version) => {
        if (version.distro && version.distro.toLowerCase() !== 'unstable') {
          if (
            !availableDistros.some(({ distro }) => distro === version.distro)
          ) {
            const minors = versions.filter((v) => v.distro === version.distro);
            // Sort minors in descending order.
            minors.sort(Compare.version('desc'));

            availableDistros.push({
              distro: version.distro,
              count: minors.length,
              minors: [...new Set(minors.map((m) => m.toShortString()))],
            });
          }
        }
      });

      // Sort by distro in descending order.
      availableDistros.sort((a, b) =>
        Compare.string('desc')(a.distro, b.distro),
      );

      return {
        ...state,
        availableDistros,
      };
    }

    default:
      return state;
  }
};
