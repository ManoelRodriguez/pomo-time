import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet /> {/* //Usado para posicionar o restante da página que não é "padrão" */}
        </LayoutContainer>
    )
}