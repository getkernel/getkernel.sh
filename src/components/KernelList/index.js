/**
 * KernelList component.
 */
import React, { useContext, useMemo, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import { KernelsContext, FiltersContext } from '../../contexts';
import {
  versionsFilter,
  distrosFilter,
  releaseTypeFilter,
} from '../../selectors';
import ServerIndexObject from '../../models/ServerIndexObject';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { items },
  } = useContext(KernelsContext);
  const { selectedVersions, selectedDistros, releaseType } = useContext(
    FiltersContext,
  );

  const filteredVersions = useMemo(() => {
    const [, distrosRest] = selectedDistros;
    if (distrosRest) {
      return items
        .map((entry) => ServerIndexObject.parse(entry).toVersion())
        .filter(distrosFilter(selectedDistros))
        .filter(releaseTypeFilter(releaseType));
    }
    return items
      .map((entry) => ServerIndexObject.parse(entry).toVersion())
      .filter(versionsFilter(selectedVersions))
      .filter(releaseTypeFilter(releaseType));
  }, [items, selectedVersions, selectedDistros, releaseType]);

  return (
    <div className={classes.root}>
      <KernelListToolbar />
      <PageContent>
        <Grid container spacing={3}>
          {filteredVersions.map((version, index) => (
            <KernelListItem
              key={version.toString()}
              version={version}
              index={index}
              animate
            />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default memo(KernelList);
