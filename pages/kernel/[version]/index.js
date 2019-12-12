import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../../src/layouts/MainLayout';
import KernelVersion from '../../../src/components/KernelVersion';

const KernelVersionPage = ({ version }) => {
  const pageTitle = `Get Kernel ${version}`;
  const contentTitle = `${version} Mainline Build`;

  return (
    <MainLayout pageTitle={pageTitle} contentTitle={contentTitle}>
      <KernelVersion version={version} />
    </MainLayout>
  );
};

KernelVersionPage.getInitialProps = (context) => {
  const {
    query: { version, tag },
  } = context;

  return { version, tag };
};

KernelVersionPage.propTypes = {
  version: PropTypes.string.isRequired,
};

export default KernelVersionPage;
