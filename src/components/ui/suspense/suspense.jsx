import React from 'react';
import Error from '../error'
import Loader from '../loader'

export const Suspense = ({ renderLoading, renderError, children, loading, error }) => {
  if (error) return renderLoading ? renderLoading() : <Error />;
  if (loading) return renderError ? renderError() : <Loader />;

  return children;
};