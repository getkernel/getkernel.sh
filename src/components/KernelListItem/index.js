/**
 * KernelListItem component.
 * Rendered by KernelList.
 */
import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import BookmarkToggle from '../BookmarkToggle';
import Version from '../../models/Version';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListItem = ({ version, index, bookmarkable, animate }) => {
  const classes = useStyles();

  const versionStr = version.toString();
  const dateFriendly = version.toFormattedLastModified('L');
  const timeFriendly = version.toFormattedLastModified('LT');

  const chips = useMemo(() => {
    const array = [];
    if (version.distro) {
      array.push({
        label: version.distro.toUpperCase(),
        title: version.distro,
      });
    }
    if (version.isCKT()) {
      array.push({
        label: `CKT${version.ckt}`,
        title: `CKT${version.ckt}`,
      });
    }
    if (version.isRC()) {
      array.push({
        label: `RC${version.rc}`,
        title: 'Release Candidate',
        color: 'secondary',
      });
    }
    return array;
  }, [version]);

  const timeout = Math.min((index + 1) * 250, 1000);

  return (
    <Grid item xs={6} md={4} lg={3} xl={2}>
      <Fade in={animate} timeout={timeout}>
        <Card>
          <Link
            href={version.tag ? '/kernel/[version]/[tag]' : '/kernel/[version]'}
            as={`/kernel/${version.slug}`}
          >
            <CardActionArea title={versionStr}>
              <div className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.topArea}>
                    <Typography className={classes.versionName} variant="h5">
                      <span>{version.toFriendlyString(false)}</span>
                    </Typography>
                  </CardContent>
                  <div className={classes.bottomArea}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      title="Last modified"
                    >
                      <span>{dateFriendly}</span>
                      <span>{timeFriendly}</span>
                    </Typography>
                  </div>
                </div>

                <div className={classes.cover}>
                  <img
                    src="/images/deb.svg"
                    title={versionStr}
                    alt="deb package"
                  />
                </div>
              </div>
            </CardActionArea>
          </Link>
          <CardActions disableSpacing className={classes.actions}>
            <BookmarkToggle version={version} bookmarkable={bookmarkable} />
            <div>
              {chips &&
                chips.map(({ label, title, color }) => (
                  <Chip
                    key={`chip-${label}`}
                    size="small"
                    color={color || 'default'}
                    label={label}
                    className={classes.chip}
                    title={title}
                  />
                ))}
            </div>
          </CardActions>
        </Card>
      </Fade>
    </Grid>
  );
};

KernelListItem.defaultProps = {
  bookmarkable: true,
  animate: true,
};

KernelListItem.propTypes = {
  version: PropTypes.instanceOf(Version).isRequired,
  index: PropTypes.number.isRequired,
  bookmarkable: PropTypes.bool,
  animate: PropTypes.bool,
};

export default memo(KernelListItem);
