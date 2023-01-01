/* Re-generate the page at most once every 60 seconds */
const REVALIDATE_AT_MOST_SEC = 60;

export const getStaticProps = () => {
  return {
    props: {},
    revalidate: REVALIDATE_AT_MOST_SEC,
  };
};
