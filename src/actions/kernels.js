/**
 * Action generators for kernels.
 */

/**
 * hydrateIndexData action generator.
 * @param {Object} data Index data
 */
export const hydrateIndexData = (data) => ({
  type: 'HYDRATE_INDEX_DATA',
  data,
});

/**
 * addKernelData action generator.
 * @param {Object} data Kernel data
 */
export const addKernelData = (data) => ({
  type: 'ADD_KERNEL_DATA',
  data,
});
