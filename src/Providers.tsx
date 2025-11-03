import type { FC } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "./components/Atoms/Toast";

const Providers: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Provider store={store}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Toaster position="top-center" />
        {children}
      </SkeletonTheme>
    </Provider>
  );
};

export default Providers;
