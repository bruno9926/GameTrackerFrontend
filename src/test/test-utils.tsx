import Providers from "@app/providers/Providers";
import { render } from "@testing-library/react";

const customRender = (ui: React.ReactNode) => {
    return render(
        <Providers>{ui}</Providers>
    )
}

export * from "@testing-library/react";
export { customRender as render };