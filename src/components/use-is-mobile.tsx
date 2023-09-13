import useWindowSize from "./use-window-size";

const useIsMobile = () => {
  const { width: windowWidth } = useWindowSize();

  if (windowWidth === undefined) {
    return undefined;
  }
  const isBrowserMobile = !!windowWidth && windowWidth < 768;
  return isBrowserMobile;
};

export default useIsMobile;
