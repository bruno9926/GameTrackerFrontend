import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "./store/test-store";
import { SkeletonTheme } from "react-loading-skeleton";
import { Toaster } from "react-hot-toast";

const customRender = (ui: React.ReactNode, preloadedState = {}) => {
    return render(
        <Provider store={createTestStore(preloadedState)}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Toaster position="top-center" />
                {ui}
            </SkeletonTheme>
        </Provider>
    )
}

export * from "@testing-library/react";
export { customRender as render };